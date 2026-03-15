import type { LevelData, SessionState } from "../game/core/types";
import { ControlsPanel } from "./ControlsPanel";
import { LevelOverviewPanel } from "./LevelOverviewPanel";
import { ProgressPanel } from "./ProgressPanel";

interface GameSidebarProps {
  levels: LevelData[];
  completedLevelCount: number;
  currentLevelIndex: number;
  session: SessionState;
  canAdvance: boolean;
  accessibleLevelIndex: number;
  isFinalLevel: boolean;
  onPrevious: () => void;
  onRestart: () => void;
  onNext: () => void;
  onSelectLevel: (index: number) => void;
}

export function GameSidebar({
  levels,
  completedLevelCount,
  currentLevelIndex,
  session,
  canAdvance,
  accessibleLevelIndex,
  isFinalLevel,
  onPrevious,
  onRestart,
  onNext,
  onSelectLevel,
}: GameSidebarProps) {
  const level = levels[currentLevelIndex];

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-6">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(22,18,24,0.88)] shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(240,181,109,0.08),transparent_28%),linear-gradient(315deg,rgba(143,139,232,0.08),transparent_30%)]" />
        <div className="relative z-10 p-5">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[rgba(233,223,211,0.5)]">
            Map
          </p>
          <LevelOverviewPanel
            currentLevelIndex={currentLevelIndex}
            levelName={level.name}
            session={session}
            canAdvance={canAdvance}
            isFinalLevel={isFinalLevel}
            onPrevious={onPrevious}
            onRestart={onRestart}
            onNext={onNext}
          />
          <div className="my-4 h-px bg-white/6" />
          <ProgressPanel
            levels={levels}
            completedLevelCount={completedLevelCount}
            currentLevelIndex={currentLevelIndex}
            accessibleLevelIndex={accessibleLevelIndex}
            onSelectLevel={onSelectLevel}
          />
        </div>
      </div>
      <ControlsPanel />
    </aside>
  );
}
