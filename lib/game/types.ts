export type GameStatus = "lobby" | "countdown" | "playing" | "finished";

export type Obstacle = {
  id: string;
  x: number;
  y: number;
  r: number;
  expiresAt?: number;
};

export type Player = {
  id: string;
  name: string;
  x: number;
  y: number;
  angle: number;
  alive: boolean;
  color: string;
  kills: number;
  lastShot: number;
};

export type Laser = {
  id: string;
  ownerId: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number }[];
};

export type PlayerInput = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  angle: number;
  shoot: boolean;
};

export type GameRoom = {
  id: string;
  code: string;
  status: GameStatus;
  width: number;
  height: number;
  players: Record<string, Player>;
  obstacles: Obstacle[];
  lasers: Laser[];
  winnerId: string | null;
  countdown: number;
  createdAt: number;
  lastTick: number;
  maxPlayers: number;
  countdownStartedAt?: number;
  matchStartedAt?: number;
};

export type PublicGameState = {
  id: string;
  code: string;
  status: GameStatus;
  width: number;
  height: number;
  players: Player[];
  obstacles: Obstacle[];
  lasers: Laser[];
  winnerId: string | null;
  countdown: number;
  playerCount: number;
  maxPlayers: number;
};

export const ARENA_WIDTH = 1100;
export const ARENA_HEIGHT = 640;
export const PLAYER_RADIUS = 16;
export const LASER_SPEED = 14;
export const LASER_RADIUS = 4;
export const LASER_TRAIL_LENGTH = 22;
export const PLAYER_SPEED = 4.2;
export const SHOOT_COOLDOWN_MS = 450;
export const MAX_PLAYERS = 4;
export const MIN_PLAYERS_TO_START = 2;
export const OBSTACLE_MIN_LIFETIME_MS = 8_000;
export const OBSTACLE_MAX_LIFETIME_MS = 42_000;
export const OBSTACLE_FADE_MS = 2_000;

export const PLAYER_COLORS = ["#c084fc", "#f472b6", "#38bdf8", "#fbbf24"];
