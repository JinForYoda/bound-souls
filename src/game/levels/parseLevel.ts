import { isLevelSymbol, LevelSymbol } from "../core/levelSymbols";
import type { LevelData, Point, WorldData } from "../core/types";
import { symbolLogic } from "../logic/symbolLogic";

export interface RawLevelDefinition {
  id: string;
  name: string;
  light: string[];
  shadow: string[];
}

function parseWorld(rows: string[], worldName: string): WorldData {
  const height = rows.length;
  const width = rows[0]?.length ?? 0;
  let start: Point | null = null;
  let exit: Point | null = null;

  const symbols = rows.map((row, y) => {
    if (row.length !== width) {
      throw new Error(`${worldName} has inconsistent row widths.`);
    }

    return row.split("").map((value, x): LevelSymbol => {
      if (!isLevelSymbol(value)) {
        throw new Error(`${worldName} contains unsupported tile "${value}".`);
      }

      const symbol = value;
      const definition = symbolLogic[symbol];

      if (definition.isStart) {
        if (start) {
          throw new Error(`${worldName} contains more than one start.`);
        }

        start = { x, y };
      }

      if (definition.isExit) {
        if (exit) {
          throw new Error(`${worldName} contains more than one exit.`);
        }

        exit = { x, y };
      }

      return symbol;
    });
  });

  if (!start || !exit) {
    throw new Error(`${worldName} must contain one start and one exit.`);
  }

  return {
    symbols,
    start,
    exit,
    width,
    height,
  };
}

export function parseLevel(definition: RawLevelDefinition): LevelData {
  const light = parseWorld(definition.light, `${definition.id}:light`);
  const shadow = parseWorld(definition.shadow, `${definition.id}:shadow`);

  if (light.width !== shadow.width || light.height !== shadow.height) {
    throw new Error(`${definition.id} worlds must be the same size.`);
  }

  return {
    id: definition.id,
    name: definition.name,
    width: light.width,
    height: light.height,
    light,
    shadow,
  };
}
