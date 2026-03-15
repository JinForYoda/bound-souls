import type { LevelSymbol } from "./levelSymbols";

export type Direction = "up" | "down" | "left" | "right";

export type WorldKey = "light" | "shadow";

export interface Point {
  x: number;
  y: number;
}

export interface WorldData {
  symbols: LevelSymbol[][];
  start: Point;
  exit: Point;
  width: number;
  height: number;
}

export interface LevelData {
  id: string;
  name: string;
  width: number;
  height: number;
  light: WorldData;
  shadow: WorldData;
}

export interface PlayersState {
  light: Point;
  shadow: Point;
}

export interface MoveAnimation {
  from: PlayersState;
  to: PlayersState;
  startedAt: number;
  durationMs: number;
  direction: Direction;
}

export interface SessionState {
  players: PlayersState;
  moveCount: number;
  status: "playing" | "won";
  animation: MoveAnimation | null;
}
