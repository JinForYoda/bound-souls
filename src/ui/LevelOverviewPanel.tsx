import type { SessionState } from "../game/core/types";
import { Badge } from "./Badge";
import { ControlButton } from "./ControlButton";

interface LevelOverviewPanelProps {
  currentLevelIndex: number;
  levelName: string;
  session: SessionState;
  canAdvance: boolean;
  isFinalLevel: boolean;
  onPrevious: () => void;
  onRestart: () => void;
  onNext: () => void;
}

export function LevelOverviewPanel({
  currentLevelIndex,
  levelName,
  session,
  canAdvance,
  isFinalLevel,
  onPrevious,
  onRestart,
  onNext,
}: LevelOverviewPanelProps) {
  return (
    <section className="mt-4">
      <h2 className="font-display text-[2.05rem] leading-[0.94] tracking-[0.02em] text-[#fff1cf]">
        {currentLevelIndex + 1}. {levelName}
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        <Badge label="Moves" value={session.moveCount}  />
        <Badge
          label="Status"
          value={session.status === "won" ? "Aligned" : "Unbound"}
          valueClassName={`${
            session.status === "won" ? "text-[#f5d39e]" : "text-[#fff1cf]"
          }`}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <ControlButton onClick={onPrevious} disabled={currentLevelIndex === 0}>
          Previous
        </ControlButton>
        <ControlButton onClick={onRestart}>Restart</ControlButton>
        <ControlButton onClick={onNext} disabled={!canAdvance}>
          {isFinalLevel ? "Completed" : "Next Level"}
        </ControlButton>
      </div>

      {session.status === "won" && (
        <div className="mt-4 rounded-[20px] border border-[rgba(240,181,109,0.22)] bg-[rgba(39,26,19,0.5)] p-4 text-[0.95rem] leading-7 text-[#f6dfbf]">
          Both souls reached their gates.
          {isFinalLevel ? " The rite is complete." : " A deeper chamber now opens."}
        </div>
      )}
    </section>
  );
}
