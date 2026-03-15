import { useEffect, useRef, useState } from "react";
import type { LevelData, SessionState } from "../game/core/types";
import { DualWorldRenderer } from "../game/render/DualWorldRenderer";
import { useGameStore } from "../store/gameStore";

interface GameCanvasProps {
  level: LevelData;
  session: SessionState;
}

interface CanvasSize {
  width: number;
  height: number;
}

export function GameCanvas({ level, session }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef(new DualWorldRenderer());
  const frameRef = useRef<number | null>(null);
  const completeAnimation = useGameStore((state) => state.completeAnimation);
  const [size, setSize] = useState<CanvasSize>({ width: 720, height: 760 });

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const height = Math.max(420, Math.min(760, width * 1.08));
      setSize({
        width,
        height,
      });
    });

    observer.observe(wrapper);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const renderingCanvas = canvas;
    const renderingContext = ctx;

    function renderFrame(): void {
      const displayWidth = Math.max(1, Math.floor(size.width));
      const displayHeight = Math.max(1, Math.floor(size.height));
      const ratio = window.devicePixelRatio || 1;

      if (
        renderingCanvas.width !== Math.floor(displayWidth * ratio) ||
        renderingCanvas.height !== Math.floor(displayHeight * ratio)
      ) {
        renderingCanvas.width = Math.floor(displayWidth * ratio);
        renderingCanvas.height = Math.floor(displayHeight * ratio);
        renderingCanvas.style.width = `${displayWidth}px`;
        renderingCanvas.style.height = `${displayHeight}px`;
        renderingContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      }

      rendererRef.current.render({
        ctx: renderingContext,
        level,
        session,
        width: displayWidth,
        height: displayHeight,
        now: performance.now(),
      });

      completeAnimation();
      frameRef.current = window.requestAnimationFrame(renderFrame);
    }

    frameRef.current = window.requestAnimationFrame(renderFrame);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [completeAnimation, level, session, size.height, size.width]);

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(14,12,18,0.9)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(240,181,109,0.06),transparent_26%),linear-gradient(315deg,rgba(143,139,232,0.08),transparent_28%)]" />
      <div className="relative z-10 overflow-hidden rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(6,6,9,0.96),rgba(15,13,18,0.96))]">
        <canvas
          ref={canvasRef}
          className="block w-full"
          aria-label="Bound Souls game board"
        />
      </div>
    </div>
  );
}
