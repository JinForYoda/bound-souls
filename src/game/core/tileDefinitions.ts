import { TileType } from "./types";

export enum TileRenderVariant {
  Floor = "floor",
  Wall = "wall",
}

export interface TileDefinition {
  type: TileType;
  blocksMovement: boolean;
  isGoal: boolean;
  renderVariant: TileRenderVariant;
}

export const tileDefinitions: Record<TileType, TileDefinition> = {
  [TileType.Empty]: {
    type: TileType.Empty,
    blocksMovement: false,
    isGoal: false,
    renderVariant: TileRenderVariant.Floor,
  },
  [TileType.Wall]: {
    type: TileType.Wall,
    blocksMovement: true,
    isGoal: false,
    renderVariant: TileRenderVariant.Wall,
  },
};

export function getTileDefinition(tileType: TileType): TileDefinition {
  return tileDefinitions[tileType];
}
