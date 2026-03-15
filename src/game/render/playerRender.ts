import type { Point, WorldKey } from "../core/types";
import { drawPlayerSprite } from "./playerSprites";
import type { WorldPalette } from "./renderConfig";

export interface PlayerRenderContext {
  ctx: CanvasRenderingContext2D;
  player: Point;
  originX: number;
  originY: number;
  tileSize: number;
  colors: WorldPalette;
  isMoving: boolean;
}

export interface PlayerRenderDefinition {
  draw: (context: PlayerRenderContext) => void;
}

function createPlayerRenderer(worldKey: WorldKey): PlayerRenderDefinition {
  return {
    draw(context) {
      const { ctx, player, originX, originY, tileSize, colors, isMoving } = context;
      const centerX = originX + (player.x + 0.5) * tileSize;
      const baseY = originY + (player.y + 1) * tileSize;
      const spriteHeight = tileSize * 1.18;
      const spriteWidth = tileSize * 0.76;
      const spriteX = centerX - spriteWidth / 2;
      const spriteY = baseY - spriteHeight + tileSize * 0.03;
      const spriteState = isMoving ? "move" : "idle";

      ctx.save();
      ctx.shadowBlur = tileSize * 0.65;
      ctx.shadowColor = colors.glow;
      drawPlayerSprite(
        ctx,
        worldKey,
        spriteState,
        spriteX,
        spriteY,
        spriteWidth,
        spriteHeight,
      );
      ctx.restore();
    },
  };
}

export const playerRender: Record<WorldKey, PlayerRenderDefinition> = {
  light: createPlayerRenderer("light"),
  shadow: createPlayerRenderer("shadow"),
};
