import { TileRenderVariant } from "../core/tileDefinitions";
import { WorldObjectRenderVariant } from "../core/worldObjectDefinitions";

export interface WorldPalette {
  floor: string;
  floorAlt: string;
  wall: string;
  wallEdge: string;
  exit: string;
  exitCore: string;
  player: string;
  playerCore: string;
  glow: string;
  label: string;
}

export interface TileRenderContext {
  ctx: CanvasRenderingContext2D;
  tileX: number;
  tileY: number;
  tileSize: number;
  colors: WorldPalette;
}

export interface TileRenderRecipe {
  variant: TileRenderVariant;
  draw: (context: TileRenderContext) => void;
}

export interface WorldObjectRenderContext {
  ctx: CanvasRenderingContext2D;
  tileX: number;
  tileY: number;
  tileSize: number;
  colors: WorldPalette;
}

export interface WorldObjectRenderRecipe {
  variant: WorldObjectRenderVariant;
  draw: (context: WorldObjectRenderContext) => void;
}

function drawFloor(): void {}

function drawWall({ ctx, tileX, tileY, tileSize, colors }: TileRenderContext): void {
  const inset = tileSize * 0.09;

  ctx.save();
  ctx.shadowBlur = tileSize * 0.26;
  ctx.shadowColor = colors.glow;
  ctx.fillStyle = colors.wall;
  ctx.beginPath();
  ctx.roundRect(tileX + inset, tileY + inset, tileSize - inset * 2, tileSize - inset * 2, 8);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = colors.wallEdge;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.roundRect(tileX + inset, tileY + inset, tileSize - inset * 2, tileSize - inset * 2, 8);
  ctx.stroke();
}

function drawExit({ ctx, tileX, tileY, tileSize, colors }: WorldObjectRenderContext): void {
  const centerX = tileX + tileSize / 2;
  const centerY = tileY + tileSize / 2;
  const radius = tileSize * 0.2;

  ctx.save();
  ctx.shadowBlur = tileSize * 0.5;
  ctx.shadowColor = colors.glow;
  ctx.fillStyle = colors.exit;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 1.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = colors.exitCore;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - radius);
  ctx.lineTo(centerX + radius, centerY);
  ctx.lineTo(centerX, centerY + radius);
  ctx.lineTo(centerX - radius, centerY);
  ctx.closePath();
  ctx.fill();
}

export const renderConfig = {
  backdropTop: "#080a10",
  backdropBottom: "#14111b",
  frame: "rgba(255, 255, 255, 0.08)",
  gridLine: "rgba(255, 255, 255, 0.05)",
  divider: "rgba(255, 255, 255, 0.1)",
  palettes: {
    light: {
      floor: "#261c16",
      floorAlt: "#31241d",
      wall: "#8f5935",
      wallEdge: "#c38554",
      exit: "#d9a248",
      exitCore: "#fff2b6",
      player: "#ffcf8a",
      playerCore: "#fff7d6",
      glow: "rgba(255, 195, 111, 0.38)",
      label: "#ffd8a6",
    } satisfies WorldPalette,
    shadow: {
      floor: "#19182c",
      floorAlt: "#22213b",
      wall: "#514881",
      wallEdge: "#8d82c9",
      exit: "#6f7dff",
      exitCore: "#d8e1ff",
      player: "#b6a5ff",
      playerCore: "#f0ecff",
      glow: "rgba(145, 129, 255, 0.4)",
      label: "#cdbfff",
    } satisfies WorldPalette,
  },
  tileRecipes: {
    [TileRenderVariant.Floor]: {
      variant: TileRenderVariant.Floor,
      draw: drawFloor,
    },
    [TileRenderVariant.Wall]: {
      variant: TileRenderVariant.Wall,
      draw: drawWall,
    },
  },
  objectRecipes: {
    [WorldObjectRenderVariant.Exit]: {
      variant: WorldObjectRenderVariant.Exit,
      draw: drawExit,
    },
  } satisfies Record<WorldObjectRenderVariant, WorldObjectRenderRecipe>,
};
