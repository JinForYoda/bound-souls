export enum TileType {
  Empty = "empty",
  Wall = "wall",
}

export enum WorldObjectType {
  Exit = "exit",
}

export type Direction = "up" | "down" | "left" | "right";

export type WorldKey = "light" | "shadow";

export interface Point {
  x: number;
  y: number;
}

export interface WorldData {
  tiles: TileType[][];
  start: Point;
  objects: WorldObject[];
  width: number;
  height: number;
}

export interface WorldObject {
  type: WorldObjectType;
  position: Point;
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
