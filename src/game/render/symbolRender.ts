import { LevelSymbol } from "../core/levelSymbols";
import type { WorldKey } from "../core/types";
import { renderConfig, type WorldPalette } from "./renderConfig";
import { drawSymbolSprite } from "./tilesetSprites";

export interface SymbolRenderContext {
  ctx: CanvasRenderingContext2D;
  worldKey: WorldKey;
  tileX: number;
  tileY: number;
  tileSize: number;
  colors: WorldPalette;
}

export interface SymbolRenderDefinition {
  draw: (context: SymbolRenderContext) => void;
}

function drawBaseTile(
  ctx: CanvasRenderingContext2D,
  tileX: number,
  tileY: number,
  tileSize: number,
  fillStyle: string,
): void {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(tileX, tileY, tileSize, tileSize);
}

function drawGridOutline(
  ctx: CanvasRenderingContext2D,
  tileX: number,
  tileY: number,
  tileSize: number,
): void {
  ctx.strokeStyle = renderConfig.gridLine;
  ctx.lineWidth = 1;
  ctx.strokeRect(tileX + 0.5, tileY + 0.5, tileSize - 1, tileSize - 1);
}

function drawFloorSymbol({ ctx, tileX, tileY, tileSize, colors }: SymbolRenderContext): void {
  drawBaseTile(ctx, tileX, tileY, tileSize, colors.floor);
}

function drawWallSymbol(
  symbol: LevelSymbol.BoundaryWall | LevelSymbol.Obstacle,
  context: SymbolRenderContext,
): void {
  const { ctx, worldKey, tileX, tileY, tileSize, colors } = context;

  drawBaseTile(ctx, tileX, tileY, tileSize, colors.floorAlt);
  drawGridOutline(ctx, tileX, tileY, tileSize);
  drawSymbolSprite(ctx, worldKey, symbol, tileX, tileY, tileSize);
}

function drawExitSymbol(context: SymbolRenderContext): void {
  const { ctx, worldKey, tileX, tileY, tileSize, colors } = context;

  drawBaseTile(ctx, tileX, tileY, tileSize, colors.floor);
  drawSymbolSprite(ctx, worldKey, LevelSymbol.Exit, tileX, tileY, tileSize);
}

export const symbolRender: Record<LevelSymbol, SymbolRenderDefinition> = {
  [LevelSymbol.BoundaryWall]: {
    draw: (context) => drawWallSymbol(LevelSymbol.BoundaryWall, context),
  },
  [LevelSymbol.Obstacle]: {
    draw: (context) => drawWallSymbol(LevelSymbol.Obstacle, context),
  },
  [LevelSymbol.Empty]: {
    draw: drawFloorSymbol,
  },
  [LevelSymbol.Start]: {
    draw: drawFloorSymbol,
  },
  [LevelSymbol.Exit]: {
    draw: drawExitSymbol,
  },
};
