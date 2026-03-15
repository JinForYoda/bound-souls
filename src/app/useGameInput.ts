import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import type { Direction } from "../game/core/types";

const keyToDirection: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  KeyW: "up",
  KeyS: "down",
  KeyA: "left",
  KeyD: "right",
};

export function useGameInput(): void {
  const move = useGameStore((state) => state.move);
  const restartLevel = useGameStore((state) => state.restartLevel);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      if (event.repeat) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const direction = keyToDirection[event.code];

      if (direction) {
        event.preventDefault();
        move(direction);
        return;
      }

      if (event.code === "KeyR") {
        event.preventDefault();
        restartLevel();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [move, restartLevel]);
}
