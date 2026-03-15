import { getTileDefinition, TileRenderVariant } from "../core/tileDefinitions";
import { getWorldObjectDefinition } from "../core/worldObjectDefinitions";
import type { LevelData, PlayersState, Point, SessionState, WorldData } from "../core/types";
import { renderConfig, type WorldPalette } from "./renderConfig";

interface RenderParams {
  ctx: CanvasRenderingContext2D;
  level: LevelData;
  session: SessionState;
  width: number;
  height: number;
  now: number;
}

interface Layout {
  tileSize: number;
  boardWidth: number;
  boardHeight: number;
  lightX: number;
  lightY: number;
  shadowX: number;
  shadowY: number;
  panelPadding: number;
}

export class DualWorldRenderer {
  render({ ctx, level, session, width, height, now }: RenderParams): void {
    const layout = this.getLayout(level, width, height);
    const players = this.resolvePlayers(session, now);

    ctx.clearRect(0, 0, width, height);

    const background = ctx.createLinearGradient(0, 0, 0, height);
    background.addColorStop(0, renderConfig.backdropTop);
    background.addColorStop(1, renderConfig.backdropBottom);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    this.drawAura(ctx, width * 0.24, height * 0.18, 180, "rgba(255, 172, 85, 0.18)");
    this.drawAura(ctx, width * 0.72, height * 0.83, 210, "rgba(125, 112, 255, 0.18)");

    this.drawWorld(
      ctx,
      level.light,
      players.light,
      layout.lightX,
      layout.lightY,
      layout,
      "LIGHT WORLD",
      renderConfig.palettes.light,
    );
    this.drawWorld(
      ctx,
      level.shadow,
      players.shadow,
      layout.shadowX,
      layout.shadowY,
      layout,
      "SHADOW WORLD",
      renderConfig.palettes.shadow,
    );

    ctx.strokeStyle = renderConfig.divider;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(layout.lightX, layout.shadowY - layout.panelPadding * 0.65);
    ctx.lineTo(layout.lightX + layout.boardWidth, layout.shadowY - layout.panelPadding * 0.65);
    ctx.stroke();
  }

  private getLayout(level: LevelData, width: number, height: number): Layout {
    const panelPadding = Math.max(18, Math.min(width, height) * 0.03);
    const labelSpace = panelPadding * 1.3;
    const availableWidth = width - panelPadding * 2;
    const availableHeight = height - panelPadding * 2 - labelSpace * 2 - panelPadding;
    const tileSize = Math.floor(
      Math.min(availableWidth / level.width, availableHeight / (level.height * 2)),
    );
    const boardWidth = tileSize * level.width;
    const boardHeight = tileSize * level.height;
    const lightX = Math.floor((width - boardWidth) / 2);
    const lightY = panelPadding + labelSpace;
    const shadowX = lightX;
    const shadowY = lightY + boardHeight + labelSpace + panelPadding;

    return {
      tileSize,
      boardWidth,
      boardHeight,
      lightX,
      lightY,
      shadowX,
      shadowY,
      panelPadding,
    };
  }

  private resolvePlayers(session: SessionState, now: number): PlayersState {
    if (!session.animation) {
      return session.players;
    }

    const { from, to, startedAt, durationMs } = session.animation;
    const progress = Math.min(1, (now - startedAt) / durationMs);
    const eased = 1 - (1 - progress) * (1 - progress);

    return {
      light: this.interpolatePoint(from.light, to.light, eased),
      shadow: this.interpolatePoint(from.shadow, to.shadow, eased),
    };
  }

  private interpolatePoint(from: Point, to: Point, progress: number): Point {
    return {
      x: from.x + (to.x - from.x) * progress,
      y: from.y + (to.y - from.y) * progress,
    };
  }

  private drawWorld(
    ctx: CanvasRenderingContext2D,
    world: WorldData,
    player: Point,
    originX: number,
    originY: number,
    layout: Layout,
    title: string,
    colors: WorldPalette,
  ): void {
    const frameInset = Math.max(12, layout.tileSize * 0.28);

    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.strokeStyle = renderConfig.frame;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(
      originX - frameInset,
      originY - frameInset - 26,
      layout.boardWidth + frameInset * 2,
      layout.boardHeight + frameInset * 2 + 30,
      24,
    );
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = colors.label;
    ctx.font = `700 ${Math.max(12, layout.tileSize * 0.34)}px "Space Grotesk", sans-serif`;
    ctx.fillText(title, originX, originY - 18);

    for (let y = 0; y < world.height; y += 1) {
      for (let x = 0; x < world.width; x += 1) {
        const tile = world.tiles[y][x];
        const definition = getTileDefinition(tile);
        const tileX = originX + x * layout.tileSize;
        const tileY = originY + y * layout.tileSize;

        ctx.fillStyle = (x + y) % 2 === 0 ? colors.floor : colors.floorAlt;
        ctx.fillRect(tileX, tileY, layout.tileSize, layout.tileSize);

        ctx.strokeStyle = renderConfig.gridLine;
        ctx.lineWidth = 1;
        ctx.strokeRect(tileX + 0.5, tileY + 0.5, layout.tileSize - 1, layout.tileSize - 1);

        renderConfig.tileRecipes[definition.renderVariant].draw({
          ctx,
          tileX,
          tileY,
          tileSize: layout.tileSize,
          colors,
        });
      }
    }

    for (const object of world.objects) {
      const definition = getWorldObjectDefinition(object.type);
      const tileX = originX + object.position.x * layout.tileSize;
      const tileY = originY + object.position.y * layout.tileSize;

      switch (definition.renderVariant) {
        case "exit":
          renderConfig.objectRecipes[definition.renderVariant].draw({
            ctx,
            tileX,
            tileY,
            tileSize: layout.tileSize,
            colors,
          });
          break;
        default:
          break;
      }
    }

    this.drawPlayer(ctx, player, originX, originY, layout.tileSize, colors);
  }

  private drawPlayer(
    ctx: CanvasRenderingContext2D,
    player: Point,
    originX: number,
    originY: number,
    tileSize: number,
    colors: WorldPalette,
  ): void {
    const centerX = originX + (player.x + 0.5) * tileSize;
    const centerY = originY + (player.y + 0.5) * tileSize;
    const radius = tileSize * 0.24;

    ctx.save();
    ctx.shadowBlur = tileSize * 0.8;
    ctx.shadowColor = colors.glow;
    ctx.fillStyle = colors.player;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = colors.playerCore;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.28, centerY - radius * 0.3, radius * 0.28, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawAura(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string,
  ): void {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
