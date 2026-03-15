import { TileType } from "../core/types";

export enum LevelSymbol {
  Wall = "#",
  Empty = ".",
  Start = "P",
  Exit = "E",
}

export const symbolToTileType: Record<LevelSymbol, TileType> = {
  [LevelSymbol.Wall]: TileType.Wall,
  [LevelSymbol.Empty]: TileType.Empty,
  [LevelSymbol.Start]: TileType.Empty,
  [LevelSymbol.Exit]: TileType.Empty,
};
