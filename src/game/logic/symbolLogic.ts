import { LevelSymbol } from "../core/levelSymbols";
import type { Point, WorldData } from "../core/types";

export interface SymbolLogicContext {
  world: WorldData;
  point: Point;
  symbol: LevelSymbol;
}

export interface SymbolLogicDefinition {
  canEnter: (context: SymbolLogicContext) => boolean;
  isStart: boolean;
  isExit: boolean;
}

function allowEntry(): boolean {
  return true;
}

function blockEntry(): boolean {
  return false;
}

export const symbolLogic: Record<LevelSymbol, SymbolLogicDefinition> = {
  [LevelSymbol.BoundaryWall]: {
    canEnter: blockEntry,
    isStart: false,
    isExit: false,
  },
  [LevelSymbol.Obstacle]: {
    canEnter: blockEntry,
    isStart: false,
    isExit: false,
  },
  [LevelSymbol.Empty]: {
    canEnter: allowEntry,
    isStart: false,
    isExit: false,
  },
  [LevelSymbol.Start]: {
    canEnter: allowEntry,
    isStart: true,
    isExit: false,
  },
  [LevelSymbol.Exit]: {
    canEnter: allowEntry,
    isStart: false,
    isExit: true,
  },
};
