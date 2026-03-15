import type { WorldKey } from "../core/types";
import { playerSpriteUrls, type PlayerSpriteState } from "./assetManifest";

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

export function drawPlayerSprite(
  ctx: CanvasRenderingContext2D,
  worldKey: WorldKey,
  state: PlayerSpriteState,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number,
): boolean {
  const image = getImage(playerSpriteUrls[worldKey][state]);

  if (!image || !image.complete || image.naturalWidth === 0) {
    return false;
  }

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  return true;
}
