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
      className="panel-surface overflow-hidden rounded-[2rem] p-3 shadow-panel"
    >
      <canvas
        ref={canvasRef}
        className="block w-full rounded-[1.5rem]"
        aria-label="Bound Souls game board"
      />
    </div>
  );
}
