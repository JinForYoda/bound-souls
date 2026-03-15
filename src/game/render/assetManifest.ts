import { assetUrl } from "../../app/assetUrl";
import { LevelSymbol } from "../core/levelSymbols";
import type { WorldKey } from "../core/types";

export type PlayerSpriteState = "idle" | "move";

export const symbolAssetUrls: Partial<
  Record<LevelSymbol, Record<WorldKey, string>>
> = {
  [LevelSymbol.BoundaryWall]: {
    light: assetUrl("assets/tiles/light-boundary-wall-tile.png"),
    shadow: assetUrl("assets/tiles/shadow-boundary-wall-tile.png"),
  },
  [LevelSymbol.Obstacle]: {
    light: assetUrl("assets/tiles/light-obstacle-tile.png"),
    shadow: assetUrl("assets/tiles/shadow-obstacle-tile.png"),
  },
  [LevelSymbol.Exit]: {
    light: assetUrl("assets/tiles/light-exit-tile.png"),
    shadow: assetUrl("assets/tiles/shadow-exit-tile.png"),
  },
};

export const playerSpriteUrls: Record<
  WorldKey,
  Record<PlayerSpriteState, string>
> = {
  light: {
    idle: assetUrl("assets/characters/light-hero-idle.png"),
    move: assetUrl("assets/characters/light-hero-move.png"),
  },
  shadow: {
    idle: assetUrl("assets/characters/shadow-hero-idle.png"),
    move: assetUrl("assets/characters/shadow-hero-move.png"),
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
