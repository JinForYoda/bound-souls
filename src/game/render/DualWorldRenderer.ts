import type { LevelData, PlayersState, Point, SessionState, WorldData, WorldKey } from "../core/types";
import { symbolDefinitions } from "../symbolDefinitions";
import { playerRender } from "./playerRender";
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
      "light",
      "LIGHT WORLD",
      renderConfig.palettes.light,
      session.animation !== null,
    );
    this.drawWorld(
      ctx,
      level.shadow,
      players.shadow,
      layout.shadowX,
      layout.shadowY,
      layout,
      "shadow",
      "SHADOW WORLD",
      renderConfig.palettes.shadow,
      session.animation !== null,
    );
  }

  private getLayout(level: LevelData, width: number, height: number): Layout {
    const panelPadding = Math.max(18, Math.min(width, height) * 0.03);
    const labelSpace = panelPadding * 1.3;
    const worldGap = Math.max(56, panelPadding * 2.2);
    const availableWidth = width - panelPadding * 2;
    const availableHeight = height - panelPadding * 2 - labelSpace * 2 - worldGap;
    const tileSize = Math.floor(
      Math.min(availableWidth / level.width, availableHeight / (level.height * 2)),
    );
    const boardWidth = tileSize * level.width;
    const boardHeight = tileSize * level.height;
    const lightX = Math.floor((width - boardWidth) / 2);
    const lightY = panelPadding + labelSpace;
    const shadowX = lightX;
    const shadowY = lightY + boardHeight + labelSpace + worldGap;

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
    worldKey: WorldKey,
    title: string,
    colors: WorldPalette,
    isMoving: boolean,
  ): void {
    ctx.fillStyle = colors.label;
    ctx.font = `700 ${Math.max(12, layout.tileSize * 0.34)}px "Space Grotesk", sans-serif`;
    ctx.fillText(title, originX, originY - Math.max(8, layout.tileSize * 0.18));

    for (let y = 0; y < world.height; y += 1) {
      for (let x = 0; x < world.width; x += 1) {
        const symbol = world.symbols[y][x];
        const definition = symbolDefinitions[symbol];
        const tileX = originX + x * layout.tileSize;
        const tileY = originY + y * layout.tileSize;

        definition.render.draw({
          ctx,
          worldKey,
          tileX,
          tileY,
          tileSize: layout.tileSize,
          colors,
        });
      }
    }

    this.drawPlayer(ctx, player, originX, originY, layout.tileSize, colors, worldKey, isMoving);
  }

  private drawPlayer(
    ctx: CanvasRenderingContext2D,
    player: Point,
    originX: number,
    originY: number,
    tileSize: number,
    colors: WorldPalette,
    worldKey: WorldKey,
    isMoving: boolean,
  ): void {
    playerRender[worldKey].draw({
      ctx,
      player,
      originX,
      originY,
      tileSize,
      colors,
      isMoving,
    });
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
