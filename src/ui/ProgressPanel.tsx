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
  const completionPercent = Math.round((completedLevelCount / levels.length) * 100);

  return (
    <section>
      <p className="text-[0.92rem] leading-[1.66] text-[rgba(233,223,211,0.72)]">
        Unlocked {unlockedChamberCount} / {levels.length} chambers
      </p>
      <div className="mt-4" aria-hidden="true">
        <div className="h-2.5 overflow-hidden rounded-full border border-white/[0.05] bg-white/[0.05]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#f0b56d,#d9c8ff)] shadow-[0_0_18px_rgba(240,181,109,0.24)]"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <p className="mt-2 text-[0.72rem] uppercase tracking-[0.24em] text-[rgba(233,223,211,0.5)]">
          {completionPercent}% sealed
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">
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
      <p className="mt-4 text-[0.92rem] leading-[1.66] text-[rgba(233,223,211,0.72)]">
        The souls move as one, but the worlds do not mirror each other. If either path is blocked,
        the step is denied to both.
      </p>
    </section>
  );
}
