import { DIRECTION_VECTORS } from "../core/directions";
import type { Direction, LevelData, PlayersState, Point, WorldData } from "../core/types";
import { canEnterTile } from "./tileBehaviors";
import { isSolved } from "./session";

export interface MoveResult {
  moved: boolean;
  players: PlayersState;
  won: boolean;
}

function offsetPoint(point: Point, direction: Direction): Point {
  const delta = DIRECTION_VECTORS[direction];

  return {
    x: point.x + delta.x,
    y: point.y + delta.y,
  };
}

function canEnter(world: WorldData, point: Point): boolean {
  return canEnterTile(world, point);
}

export function attemptMove(level: LevelData, players: PlayersState, direction: Direction): MoveResult {
  const nextLight = offsetPoint(players.light, direction);
  const nextShadow = offsetPoint(players.shadow, direction);

  if (!canEnter(level.light, nextLight) || !canEnter(level.shadow, nextShadow)) {
    return {
      moved: false,
      players,
      won: isSolved(level, players),
    };
  }

  const nextPlayers = {
    light: nextLight,
    shadow: nextShadow,
  };

  return {
    moved: true,
    players: nextPlayers,
    won: isSolved(level, nextPlayers),
  };
}
