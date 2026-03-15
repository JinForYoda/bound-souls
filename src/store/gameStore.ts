import { create } from "zustand";
import { levels } from "../game/levels";
import { attemptMove } from "../game/logic/movement";
import { createSessionState } from "../game/logic/session";
import type { Direction, SessionState } from "../game/core/types";

const STORAGE_KEY = "bound-souls-progress";
const MOVE_DURATION_MS = 150;

interface ProgressSnapshot {
  currentLevelIndex: number;
  unlockedLevelIndex: number;
}

interface GameStore extends ProgressSnapshot {
  session: SessionState;
  move: (direction: Direction) => void;
  completeAnimation: () => void;
  restartLevel: () => void;
  nextLevel: () => void;
  previousLevel: () => void;
  goToLevel: (index: number) => void;
}

function clampIndex(value: number): number {
  return Math.max(0, Math.min(levels.length - 1, value));
}

function loadProgress(): ProgressSnapshot {
  if (typeof window === "undefined") {
    return {
      currentLevelIndex: 0,
      unlockedLevelIndex: 0,
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {
        currentLevelIndex: 0,
        unlockedLevelIndex: 0,
      };
    }

    const parsed = JSON.parse(raw) as Partial<ProgressSnapshot>;
    const unlockedLevelIndex = clampIndex(parsed.unlockedLevelIndex ?? 0);
    const currentLevelIndex = Math.min(clampIndex(parsed.currentLevelIndex ?? 0), unlockedLevelIndex);

    return {
      currentLevelIndex,
      unlockedLevelIndex,
    };
  } catch {
    return {
      currentLevelIndex: 0,
      unlockedLevelIndex: 0,
    };
  }
}

function saveProgress(snapshot: ProgressSnapshot): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

const initialProgress = loadProgress();

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialProgress,
  session: createSessionState(levels[initialProgress.currentLevelIndex]),
  move: (direction) => {
    const { currentLevelIndex, unlockedLevelIndex, session } = get();

    if (session.animation || session.status === "won") {
      return;
    }

    const level = levels[currentLevelIndex];
    const result = attemptMove(level, session.players, direction);

    if (!result.moved) {
      return;
    }

    const nextUnlockedLevelIndex = result.won
      ? Math.min(levels.length - 1, Math.max(unlockedLevelIndex, currentLevelIndex + 1))
      : unlockedLevelIndex;

    set({
      unlockedLevelIndex: nextUnlockedLevelIndex,
      session: {
        ...session,
        players: result.players,
        moveCount: session.moveCount + 1,
        status: result.won ? "won" : "playing",
        animation: {
          from: session.players,
          to: result.players,
          startedAt: performance.now(),
          durationMs: MOVE_DURATION_MS,
          direction,
        },
      },
    });

    saveProgress({
      currentLevelIndex,
      unlockedLevelIndex: nextUnlockedLevelIndex,
    });
  },
  completeAnimation: () => {
    const { session } = get();

    if (!session.animation) {
      return;
    }

    if (performance.now() < session.animation.startedAt + session.animation.durationMs) {
      return;
    }

    set({
      session: {
        ...session,
        animation: null,
      },
    });
  },
  restartLevel: () => {
    const { currentLevelIndex, unlockedLevelIndex } = get();

    set({
      session: createSessionState(levels[currentLevelIndex]),
    });

    saveProgress({
      currentLevelIndex,
      unlockedLevelIndex,
    });
  },
  nextLevel: () => {
    const { currentLevelIndex, unlockedLevelIndex } = get();
    const nextIndex = currentLevelIndex + 1;

    if (nextIndex >= levels.length || nextIndex > unlockedLevelIndex) {
      return;
    }

    set({
      currentLevelIndex: nextIndex,
      session: createSessionState(levels[nextIndex]),
    });

    saveProgress({
      currentLevelIndex: nextIndex,
      unlockedLevelIndex,
    });
  },
  previousLevel: () => {
    const { currentLevelIndex, unlockedLevelIndex } = get();
    const previousIndex = currentLevelIndex - 1;

    if (previousIndex < 0) {
      return;
    }

    set({
      currentLevelIndex: previousIndex,
      session: createSessionState(levels[previousIndex]),
    });

    saveProgress({
      currentLevelIndex: previousIndex,
      unlockedLevelIndex,
    });
  },
  goToLevel: (index) => {
    const { unlockedLevelIndex } = get();

    if (index < 0 || index > unlockedLevelIndex || index >= levels.length) {
      return;
    }

    set({
      currentLevelIndex: index,
      session: createSessionState(levels[index]),
    });

    saveProgress({
      currentLevelIndex: index,
      unlockedLevelIndex,
    });
  },
}));
