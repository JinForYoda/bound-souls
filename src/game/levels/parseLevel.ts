import { TileType, WorldObjectType } from "../core/types";
import type { LevelData, Point, WorldData, WorldObject } from "../core/types";
import { LevelSymbol, symbolToTileType } from "./levelSymbols";

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
  const objects: WorldObject[] = [];

  const tiles = rows.map((row, y) => {
    if (row.length !== width) {
      throw new Error(`${worldName} has inconsistent row widths.`);
    }

    return row.split("").map((symbol, x): TileType => {
      switch (symbol) {
        case LevelSymbol.Wall:
        case LevelSymbol.Empty:
          return symbolToTileType[symbol];
        case LevelSymbol.Start:
          if (start) {
            throw new Error(`${worldName} contains more than one start.`);
          }

          start = { x, y };
          return symbolToTileType[symbol];
        case LevelSymbol.Exit:
          if (objects.some((object) => object.type === WorldObjectType.Exit)) {
            throw new Error(`${worldName} contains more than one exit.`);
          }

          objects.push({
            type: WorldObjectType.Exit,
            position: { x, y },
          });
          return symbolToTileType[symbol];
        default:
          throw new Error(`${worldName} contains unsupported tile "${symbol}".`);
      }
    });
  });

  if (!start || objects.every((object) => object.type !== WorldObjectType.Exit)) {
    throw new Error(`${worldName} must contain one start and one exit.`);
  }

  return {
    tiles,
    start,
    objects,
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
