import {
  ARENA_HEIGHT,
  ARENA_WIDTH,
  MAX_PLAYERS,
  type GameRoom,
  type Obstacle,
  type Player,
  type PublicGameState,
} from "@/lib/game/types";

const globalForGame = globalThis as typeof globalThis & {
  gameRooms?: Map<string, GameRoom>;
  gameCodes?: Map<string, string>;
};

function getRooms() {
  if (!globalForGame.gameRooms) globalForGame.gameRooms = new Map();
  return globalForGame.gameRooms;
}

function getCodes() {
  if (!globalForGame.gameCodes) globalForGame.gameCodes = new Map();
  return globalForGame.gameCodes;
}

function randomId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function randomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function spawnPoints(count: number) {
  const margin = 80;
  const corners = [
    { x: margin, y: margin },
    { x: ARENA_WIDTH - margin, y: margin },
    { x: margin, y: ARENA_HEIGHT - margin },
    { x: ARENA_WIDTH - margin, y: ARENA_HEIGHT - margin },
  ];
  return corners.slice(0, count);
}

function circlesOverlap(ax: number, ay: number, ar: number, bx: number, by: number, br: number) {
  const dist = Math.hypot(ax - bx, ay - by);
  return dist < ar + br + 12;
}

const PLAYER_SAFE_RADIUS = 50;

export function generateObstacles(count = 18): Obstacle[] {
  const obstacles: Obstacle[] = [];
  const spawns = spawnPoints(4);
  let attempts = 0;

  while (obstacles.length < count && attempts < 500) {
    attempts += 1;
    const r = 28 + Math.random() * 32;
    const x = r + 40 + Math.random() * (ARENA_WIDTH - 2 * (r + 40));
    const y = r + 40 + Math.random() * (ARENA_HEIGHT - 2 * (r + 40));

    const overlapsSpawn = spawns.some((spawn) => circlesOverlap(x, y, r, spawn.x, spawn.y, PLAYER_SAFE_RADIUS));
    const overlapsRock = obstacles.some((rock) => circlesOverlap(x, y, r, rock.x, rock.y, rock.r));
    if (overlapsSpawn || overlapsRock) continue;

    obstacles.push({ id: randomId("rock"), x, y, r });
  }

  return obstacles;
}

export function createRoom(hostName: string): { room: GameRoom; playerId: string } {
  const rooms = getRooms();
  const codes = getCodes();
  const id = randomId("room");
  let code = randomCode();
  while (codes.has(code)) code = randomCode();

  const playerId = randomId("player");
  const spawns = spawnPoints(1);
  const room: GameRoom = {
    id,
    code,
    status: "lobby",
    width: ARENA_WIDTH,
    height: ARENA_HEIGHT,
    players: {
      [playerId]: {
        id: playerId,
        name: hostName.slice(0, 16) || "Player",
        x: spawns[0].x,
        y: spawns[0].y,
        angle: 0,
        alive: true,
        color: "#c084fc",
        kills: 0,
        lastShot: 0,
      },
    },
    obstacles: generateObstacles(),
    lasers: [],
    winnerId: null,
    countdown: 3,
    createdAt: Date.now(),
    lastTick: Date.now(),
    maxPlayers: MAX_PLAYERS,
  };

  rooms.set(id, room);
  codes.set(code, id);
  return { room, playerId };
}

export function joinRoom(code: string, playerName: string): { room: GameRoom; playerId: string } | null {
  const rooms = getRooms();
  const codes = getCodes();
  const roomId = codes.get(code.toUpperCase());
  if (!roomId) return null;

  const room = rooms.get(roomId);
  if (!room || room.status !== "lobby") return null;
  if (Object.keys(room.players).length >= room.maxPlayers) return null;

  const playerId = randomId("player");
  const index = Object.keys(room.players).length;
  const spawns = spawnPoints(room.maxPlayers);
  const colors = ["#c084fc", "#f472b6", "#38bdf8", "#fbbf24"];

  room.players[playerId] = {
    id: playerId,
    name: playerName.slice(0, 16) || `Player ${index + 1}`,
    x: spawns[index]?.x ?? ARENA_WIDTH / 2,
    y: spawns[index]?.y ?? ARENA_HEIGHT / 2,
    angle: 0,
    alive: true,
    color: colors[index % colors.length],
    kills: 0,
    lastShot: 0,
  };

  return { room, playerId };
}

export function getRoom(roomId: string) {
  return getRooms().get(roomId) ?? null;
}

export function toPublicState(room: GameRoom): PublicGameState {
  return {
    id: room.id,
    code: room.code,
    status: room.status,
    width: room.width,
    height: room.height,
    players: Object.values(room.players),
    obstacles: room.obstacles,
    lasers: room.lasers,
    winnerId: room.winnerId,
    countdown: room.countdown,
    playerCount: Object.keys(room.players).length,
    maxPlayers: room.maxPlayers,
  };
}

export function resetRoomForRematch(room: GameRoom) {
  const spawns = spawnPoints(room.maxPlayers);
  const players = Object.values(room.players);
  room.status = "lobby";
  room.winnerId = null;
  room.lasers = [];
  room.obstacles = generateObstacles();
  room.countdown = 3;
  room.lastTick = Date.now();
  room.countdownStartedAt = undefined;
  room.matchStartedAt = undefined;

  players.forEach((player, index) => {
    room.players[player.id] = {
      ...player,
      x: spawns[index]?.x ?? ARENA_WIDTH / 2,
      y: spawns[index]?.y ?? ARENA_HEIGHT / 2,
      alive: true,
      kills: 0,
      lastShot: 0,
    };
  });
}

export function pruneStaleRooms() {
  const rooms = getRooms();
  const codes = getCodes();
  const now = Date.now();
  for (const [id, room] of rooms.entries()) {
    if (now - room.lastTick > 1000 * 60 * 30) {
      rooms.delete(id);
      codes.delete(room.code);
    }
  }
}

export function getPlayer(room: GameRoom, playerId: string): Player | null {
  return room.players[playerId] ?? null;
}
