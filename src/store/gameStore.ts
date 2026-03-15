import { create } from "zustand";
import { levels } from "../game/levels";
import { attemptMove } from "../game/logic/movement";
import { createSessionState } from "../game/logic/session";
import type { Direction, SessionState } from "../game/core/types";
import { runtimeAssetUrls } from "../game/render/assetManifest";

const STORAGE_KEY = "bound-souls-progress";
const MOVE_DURATION_MS = 150;
const ASSET_LOAD_DELAY_MS = 300;

interface ProgressSnapshot {
  currentLevelIndex: number;
  completedLevelCount: number;
}

interface GameStore extends ProgressSnapshot {
  assetStatus: "idle" | "loading" | "ready" | "error";
  loadedAssetCount: number;
  totalAssetCount: number;
  assetErrorMessage: string | null;
  session: SessionState;
  preloadAssets: () => Promise<void>;
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
      completedLevelCount: 0,
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {
        currentLevelIndex: 0,
        completedLevelCount: 0,
      };
    }

    const parsed = JSON.parse(raw) as Partial<ProgressSnapshot>;
    const completedLevelCount = Math.max(
      0,
      Math.min(levels.length, parsed.completedLevelCount ?? (parsed as { unlockedLevelIndex?: number }).unlockedLevelIndex ?? 0),
    );
    const accessibleLevelIndex = Math.min(levels.length - 1, completedLevelCount);
    const currentLevelIndex = Math.min(clampIndex(parsed.currentLevelIndex ?? 0), accessibleLevelIndex);

    return {
      currentLevelIndex,
      completedLevelCount,
    };
  } catch {
    return {
      currentLevelIndex: 0,
      completedLevelCount: 0,
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

function loadImageAsset(url: string, onLoaded: () => void): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof Image === "undefined") {
      onLoaded();
      resolve();
      return;
    }

    const image = new Image();
    let settled = false;

    function finish(): void {
      if (settled) {
        return;
      }

      settled = true;
      onLoaded();
      resolve();
    }

    image.onload = () => {
      finish();
    };

    image.onerror = () => {
      reject(new Error(`Failed to load asset: ${url}`));
    };

    image.src = url;

    if (image.complete && image.naturalWidth > 0) {
      finish();
    }
  });
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialProgress,
  assetStatus: "idle",
  loadedAssetCount: 0,
  totalAssetCount: runtimeAssetUrls.length,
  assetErrorMessage: null,
  session: createSessionState(levels[initialProgress.currentLevelIndex]),
  preloadAssets: async () => {
    const { assetStatus } = get();

    if (assetStatus === "loading" || assetStatus === "ready") {
      return;
    }

    set({
      assetStatus: "loading",
      loadedAssetCount: 0,
      totalAssetCount: runtimeAssetUrls.length,
      assetErrorMessage: null,
    });

    try {
      let loaded = 0;

      for (const [index, url] of runtimeAssetUrls.entries()) {
        if (index > 0) {
          await wait(ASSET_LOAD_DELAY_MS);
        }

        await loadImageAsset(url, () => {
          loaded += 1;
          set({
            loadedAssetCount: loaded,
          });
        });
      }

      set({
        assetStatus: "ready",
        loadedAssetCount: runtimeAssetUrls.length,
      });
    } catch (error) {
      set({
        assetStatus: "error",
        assetErrorMessage: error instanceof Error ? error.message : "Failed to load assets.",
      });
    }
  },
  move: (direction) => {
    const { assetStatus, completedLevelCount, currentLevelIndex, session } = get();

    if (assetStatus !== "ready" || session.animation || session.status === "won") {
      return;
    }

    const level = levels[currentLevelIndex];
    const result = attemptMove(level, session.players, direction);

    if (!result.moved) {
      return;
    }

    const nextCompletedLevelCount = result.won
      ? Math.min(levels.length, Math.max(completedLevelCount, currentLevelIndex + 1))
      : completedLevelCount;

    set({
      completedLevelCount: nextCompletedLevelCount,
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
      completedLevelCount: nextCompletedLevelCount,
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
    const { assetStatus, completedLevelCount, currentLevelIndex } = get();

    if (assetStatus !== "ready") {
      return;
    }

    set({
      session: createSessionState(levels[currentLevelIndex]),
    });

    saveProgress({
      currentLevelIndex,
      completedLevelCount,
    });
  },
  nextLevel: () => {
    const { assetStatus, completedLevelCount, currentLevelIndex } = get();

    if (assetStatus !== "ready") {
      return;
    }

    const accessibleLevelIndex = Math.min(levels.length - 1, completedLevelCount);
    const nextIndex = currentLevelIndex + 1;

    if (nextIndex >= levels.length || nextIndex > accessibleLevelIndex) {
      return;
    }

    set({
      currentLevelIndex: nextIndex,
      session: createSessionState(levels[nextIndex]),
    });

    saveProgress({
      currentLevelIndex: nextIndex,
      completedLevelCount,
    });
  },
  previousLevel: () => {
    const { assetStatus, completedLevelCount, currentLevelIndex } = get();

    if (assetStatus !== "ready") {
      return;
    }

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
      completedLevelCount,
    });
  },
  goToLevel: (index) => {
    const { assetStatus, completedLevelCount } = get();

    if (assetStatus !== "ready") {
      return;
    }

    const accessibleLevelIndex = Math.min(levels.length - 1, completedLevelCount);

    if (index < 0 || index > accessibleLevelIndex || index >= levels.length) {
      return;
    }

    set({
      currentLevelIndex: index,
      session: createSessionState(levels[index]),
    });

    saveProgress({
      currentLevelIndex: index,
      completedLevelCount,
    });
  },
}));
