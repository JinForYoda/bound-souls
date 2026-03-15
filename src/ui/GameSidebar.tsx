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
    <aside className="flex flex-col gap-5 lg:sticky lg:top-6">
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
      <ControlsPanel />
      <ProgressPanel
        levels={levels}
        completedLevelCount={completedLevelCount}
        currentLevelIndex={currentLevelIndex}
        accessibleLevelIndex={accessibleLevelIndex}
        onSelectLevel={onSelectLevel}
      />
    </aside>
  );
}
