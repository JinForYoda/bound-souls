import { LevelSymbol } from "../core/levelSymbols";
import type { Point, WorldData } from "../core/types";
import { symbolLogic, type SymbolLogicDefinition } from "./symbolLogic";

export interface EnterContext {
  world: WorldData;
  point: Point;
  symbol: LevelSymbol;
  definition: SymbolLogicDefinition;
}

export type EnterRule = (context: EnterContext) => boolean;

function isInsideBounds({ world, point }: EnterContext): boolean {
  return point.x >= 0 && point.y >= 0 && point.x < world.width && point.y < world.height;
}

const worldEntryRules: EnterRule[] = [isInsideBounds];
const symbolEntryRules: Partial<Record<LevelSymbol, EnterRule[]>> = {};

function getSymbolAt(world: WorldData, point: Point): LevelSymbol {
  return world.symbols[point.y][point.x];
}

function createEnterContext(world: WorldData, point: Point): EnterContext | null {
  const boundsContext: EnterContext = {
    world,
    point,
    symbol: LevelSymbol.Empty,
    definition: symbolLogic[LevelSymbol.Empty],
  };

  if (!worldEntryRules.every((rule) => rule(boundsContext))) {
    return null;
  }

  const symbol = getSymbolAt(world, point);

  return {
    world,
    point,
    symbol,
    definition: symbolLogic[symbol],
  };
}

export function canEnterTile(world: WorldData, point: Point): boolean {
  const context = createEnterContext(world, point);

  if (!context) {
    return false;
  }

  const specificRules = symbolEntryRules[context.symbol] ?? [];

  return context.definition.canEnter(context) && specificRules.every((rule) => rule(context));
}
