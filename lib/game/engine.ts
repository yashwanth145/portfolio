import {
  LASER_RADIUS,
  LASER_SPEED,
  LASER_TRAIL_LENGTH,
  MIN_PLAYERS_TO_START,
  OBSTACLE_MAX_LIFETIME_MS,
  OBSTACLE_MIN_LIFETIME_MS,
  PLAYER_RADIUS,
  PLAYER_SPEED,
  SHOOT_COOLDOWN_MS,
  type GameRoom,
  type Laser,
  type Obstacle,
  type Player,
  type PlayerInput,
} from "@/lib/game/types";

function circlesHit(ax: number, ay: number, ar: number, bx: number, by: number, br: number) {
  return Math.hypot(ax - bx, ay - by) <= ar + br;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function tryMovePlayer(room: GameRoom, player: Player, nextX: number, nextY: number) {
  let x = clamp(nextX, PLAYER_RADIUS, room.width - PLAYER_RADIUS);
  let y = clamp(nextY, PLAYER_RADIUS, room.height - PLAYER_RADIUS);

  for (const rock of room.obstacles) {
    const dx = x - rock.x;
    const dy = y - rock.y;
    const dist = Math.hypot(dx, dy);
    const minDist = PLAYER_RADIUS + rock.r;
    if (dist < minDist && dist > 0) {
      const push = (minDist - dist) / dist;
      x += dx * push;
      y += dy * push;
    }
  }

  for (const other of Object.values(room.players)) {
    if (other.id === player.id || !other.alive) continue;
    const dx = x - other.x;
    const dy = y - other.y;
    const dist = Math.hypot(dx, dy);
    const minDist = PLAYER_RADIUS * 2;
    if (dist < minDist && dist > 0) {
      const push = (minDist - dist) / dist;
      x += dx * push;
      y += dy * push;
    }
  }

  player.x = clamp(x, PLAYER_RADIUS, room.width - PLAYER_RADIUS);
  player.y = clamp(y, PLAYER_RADIUS, room.height - PLAYER_RADIUS);
}

function spawnLaser(room: GameRoom, player: Player, now: number) {
  if (now - player.lastShot < SHOOT_COOLDOWN_MS) return;

  const tipX = player.x + Math.cos(player.angle) * (PLAYER_RADIUS + 6);
  const tipY = player.y + Math.sin(player.angle) * (PLAYER_RADIUS + 6);

  for (const rock of room.obstacles) {
    if (circlesHit(tipX, tipY, LASER_RADIUS, rock.x, rock.y, rock.r)) return;
  }

  player.lastShot = now;
  room.lasers.push({
    id: `laser_${now}_${player.id}`,
    ownerId: player.id,
    x: tipX,
    y: tipY,
    vx: Math.cos(player.angle) * LASER_SPEED,
    vy: Math.sin(player.angle) * LASER_SPEED,
    trail: [{ x: tipX, y: tipY }],
  });
}

function appendTrailPoint(laser: Laser) {
  const last = laser.trail[laser.trail.length - 1];
  if (!last || last.x !== laser.x || last.y !== laser.y) {
    laser.trail.push({ x: laser.x, y: laser.y });
  }
  if (laser.trail.length > LASER_TRAIL_LENGTH) {
    laser.trail = laser.trail.slice(-LASER_TRAIL_LENGTH);
  }
}

function updateLasers(room: GameRoom) {
  const remaining: Laser[] = [];

  for (const laser of room.lasers) {
    let alive = true;
    const steps = 3;
    for (let step = 0; step < steps; step++) {
      laser.x += laser.vx / steps;
      laser.y += laser.vy / steps;
      appendTrailPoint(laser);

      if (
        laser.x < LASER_RADIUS ||
        laser.x > room.width - LASER_RADIUS ||
        laser.y < LASER_RADIUS ||
        laser.y > room.height - LASER_RADIUS
      ) {
        alive = false;
        break;
      }

      for (const rock of room.obstacles) {
        if (circlesHit(laser.x, laser.y, LASER_RADIUS, rock.x, rock.y, rock.r)) {
          alive = false;
          break;
        }
      }
      if (!alive) break;

      for (const target of Object.values(room.players)) {
        if (!target.alive || target.id === laser.ownerId) continue;
        if (circlesHit(laser.x, laser.y, LASER_RADIUS, target.x, target.y, PLAYER_RADIUS)) {
          target.alive = false;
          const shooter = room.players[laser.ownerId];
          if (shooter) shooter.kills += 1;
          alive = false;
          break;
        }
      }
      if (!alive) break;
    }

    if (alive) remaining.push(laser);
  }

  room.lasers = remaining;
}

function alivePlayers(room: GameRoom) {
  return Object.values(room.players).filter((player) => player.alive);
}

function assignObstacleLifetimes(obstacles: Obstacle[], now: number): Obstacle[] {
  return obstacles.map((rock) => ({
    ...rock,
    expiresAt:
      now +
      OBSTACLE_MIN_LIFETIME_MS +
      Math.random() * (OBSTACLE_MAX_LIFETIME_MS - OBSTACLE_MIN_LIFETIME_MS),
  }));
}

function updateObstacles(room: GameRoom, now: number) {
  room.obstacles = room.obstacles.filter((rock) => !rock.expiresAt || now < rock.expiresAt);
}

function checkWinner(room: GameRoom) {
  const survivors = alivePlayers(room);
  if (room.status !== "playing") return;

  if (survivors.length === 1) {
    room.status = "finished";
    room.winnerId = survivors[0].id;
    room.lasers = [];
    return;
  }

  if (survivors.length === 0) {
    room.status = "finished";
    room.winnerId = null;
    room.lasers = [];
  }
}

export function applyPlayerInput(room: GameRoom, playerId: string, input: PlayerInput, now: number) {
  const player = room.players[playerId];
  if (!player || !player.alive || room.status !== "playing") return;

  player.angle = input.angle;

  let dx = 0;
  let dy = 0;
  if (input.up) dy -= 1;
  if (input.down) dy += 1;
  if (input.left) dx -= 1;
  if (input.right) dx += 1;

  if (dx !== 0 || dy !== 0) {
    const length = Math.hypot(dx, dy) || 1;
    tryMovePlayer(room, player, player.x + (dx / length) * PLAYER_SPEED, player.y + (dy / length) * PLAYER_SPEED);
  }

  if (input.shoot) spawnLaser(room, player, now);
}

export function tickRoom(room: GameRoom, now: number) {
  room.lastTick = now;

  if (room.status === "lobby") {
    if (Object.keys(room.players).length >= MIN_PLAYERS_TO_START) {
      room.status = "countdown";
      room.countdown = 3;
      room.countdownStartedAt = now;
    }
    return;
  }

  if (room.status === "countdown") {
    if (room.countdownStartedAt === undefined) {
      room.countdownStartedAt = now;
    }
    const remaining = 3 - (now - room.countdownStartedAt) / 1000;
    room.countdown = Math.max(0, remaining);
    if (remaining <= 0) {
      room.status = "playing";
      room.countdown = 0;
      room.countdownStartedAt = undefined;
      room.matchStartedAt = now;
      room.lasers = [];
      room.obstacles = assignObstacleLifetimes(room.obstacles, now);
      for (const player of Object.values(room.players)) {
        player.alive = true;
      }
    }
    return;
  }

  if (room.status === "playing") {
    updateObstacles(room, now);
    updateLasers(room);
    checkWinner(room);
  }
}
