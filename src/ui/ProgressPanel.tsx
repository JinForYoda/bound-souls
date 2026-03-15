import type { LevelData } from "../game/core/types";
import { LevelBadge } from "./LevelBadge";

interface ProgressPanelProps {
  levels: LevelData[];
  completedLevelCount: number;
  currentLevelIndex: number;
  accessibleLevelIndex: number;
  onSelectLevel: (index: number) => void;
}

export function ProgressPanel({
  levels,
  completedLevelCount,
  currentLevelIndex,
  accessibleLevelIndex,
  onSelectLevel,
}: ProgressPanelProps) {
  const unlockedChamberCount = Math.min(levels.length, completedLevelCount + 1);

  return (
    <div className="panel-surface rounded-[2rem] p-5 shadow-panel">
      <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Progress</p>
      <p className="mt-3 text-sm text-stone-400">
        Unlocked {unlockedChamberCount} / {levels.length} chambers
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {levels.map((entry, index) => (
          <LevelBadge
            key={entry.id}
            index={index}
            active={index === currentLevelIndex}
            completed={index < completedLevelCount}
            locked={index > accessibleLevelIndex}
            onClick={() => onSelectLevel(index)}
          />
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-stone-300">
        The souls move as one, but the worlds do not mirror each other. If either path is blocked,
        the step is denied to both.
      </p>
    </div>
  );
}
