import { LevelSymbol } from "../core/levelSymbols";
import type { WorldKey } from "../core/types";
import { symbolAssetUrls } from "./assetManifest";

const imageCache = new Map<string, HTMLImageElement | null>();

function getImage(url: string): HTMLImageElement | null {
  const existing = imageCache.get(url);

  if (existing !== undefined) {
    return existing;
  }

  if (typeof Image === "undefined") {
    imageCache.set(url, null);
    return null;
  }

  const image = new Image();
  image.src = url;
  imageCache.set(url, image);
  return image;
}

function getSymbolAssetUrl(worldKey: WorldKey, symbol: LevelSymbol): string | null {
  return symbolAssetUrls[symbol]?.[worldKey] ?? null;
}

function drawSprite(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  tileX: number,
  tileY: number,
  tileSize: number,
): void {
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, tileX, tileY, tileSize, tileSize);
}

export function drawSymbolSprite(
  ctx: CanvasRenderingContext2D,
  worldKey: WorldKey,
  symbol: LevelSymbol,
  tileX: number,
  tileY: number,
  tileSize: number,
): boolean {
  const assetUrl = getSymbolAssetUrl(worldKey, symbol);

  if (!assetUrl) {
    return false;
  }

  const image = getImage(assetUrl);

  if (!image || !image.complete || image.naturalWidth === 0) {
    return false;
  }

  drawSprite(ctx, image, tileX, tileY, tileSize);
  return true;
}
