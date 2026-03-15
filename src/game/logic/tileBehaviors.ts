import { getTileDefinition } from "../core/tileDefinitions";
import { TileType } from "../core/types";
import type { Point, WorldData } from "../core/types";

export interface EnterContext {
  world: WorldData;
  point: Point;
  tile: TileType;
  definition: ReturnType<typeof getTileDefinition>;
}

export type EnterRule = (context: EnterContext) => boolean;

function isInsideBounds({ world, point }: EnterContext): boolean {
  return point.x >= 0 && point.y >= 0 && point.x < world.width && point.y < world.height;
}

function respectsMovementBlocking({ definition }: EnterContext): boolean {
  return !definition.blocksMovement;
}

const worldEntryRules: EnterRule[] = [isInsideBounds];

const tileEntryRules: Partial<Record<TileType, EnterRule[]>> = {};

function getTileAt(world: WorldData, point: Point): TileType {
  return world.tiles[point.y][point.x];
}

function createEnterContext(world: WorldData, point: Point): EnterContext | null {
  const boundsContext: EnterContext = {
    world,
    point,
    tile: TileType.Empty,
    definition: getTileDefinition(TileType.Empty),
  };

  if (!worldEntryRules.every((rule) => rule(boundsContext))) {
    return null;
  }

  const tile = getTileAt(world, point);

  return {
    world,
    point,
    tile,
    definition: getTileDefinition(tile),
  };
}

export function canEnterTile(world: WorldData, point: Point): boolean {
  const context = createEnterContext(world, point);

  if (!context) {
    return false;
  }

  const specificRules = tileEntryRules[context.tile] ?? [];

  return respectsMovementBlocking(context) && specificRules.every((rule) => rule(context));
}
