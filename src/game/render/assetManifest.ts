import { LevelSymbol } from "../core/levelSymbols";
import type { WorldKey } from "../core/types";

export type PlayerSpriteState = "idle" | "move";

export const symbolAssetUrls: Partial<
  Record<LevelSymbol, Record<WorldKey, string>>
> = {
  [LevelSymbol.BoundaryWall]: {
    light: "/assets/tiles/light-boundary-wall-tile.png",
    shadow: "/assets/tiles/shadow-boundary-wall-tile.png",
  },
  [LevelSymbol.Obstacle]: {
    light: "/assets/tiles/light-obstacle-tile.png",
    shadow: "/assets/tiles/shadow-obstacle-tile.png",
  },
  [LevelSymbol.Exit]: {
    light: "/assets/tiles/light-exit-tile.png",
    shadow: "/assets/tiles/shadow-exit-tile.png",
  },
};

export const playerSpriteUrls: Record<
  WorldKey,
  Record<PlayerSpriteState, string>
> = {
  light: {
    idle: "/assets/characters/light-hero-idle.png",
    move: "/assets/characters/light-hero-move.png",
  },
  shadow: {
    idle: "/assets/characters/shadow-hero-idle.png",
    move: "/assets/characters/shadow-hero-move.png",
  },
};

function collectUrls(
  record:
    | Partial<Record<string, Record<string, string>>>
    | Record<string, Record<string, string>>,
): string[] {
  return Object.values(record).flatMap((group) =>
    group ? Object.values(group) : [],
  );
}

export const runtimeAssetUrls = [
  ...collectUrls(symbolAssetUrls),
  ...collectUrls(playerSpriteUrls),
];
