import type { SessionState } from "../game/core/types";
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
    <div className="panel-surface rounded-[2rem] p-5 shadow-panel">
      <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Current Level</p>
      <h2 className="mt-3 text-2xl font-semibold text-stone-50">
        {currentLevelIndex + 1}. {levelName}
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Moves</p>
          <p className="mt-2 text-3xl font-semibold text-stone-100">{session.moveCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Status</p>
          <p
            className={`mt-2 text-lg font-semibold ${
              session.status === "won" ? "text-amber-200" : "text-stone-100"
            }`}
          >
            {session.status === "won" ? "Aligned" : "Unbound"}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <ControlButton onClick={onPrevious} disabled={currentLevelIndex === 0}>
          Previous
        </ControlButton>
        <ControlButton onClick={onRestart}>Restart</ControlButton>
        <ControlButton onClick={onNext} disabled={!canAdvance}>
          {isFinalLevel ? "Completed" : "Next Level"}
        </ControlButton>
      </div>

      {session.status === "won" && (
        <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-200/10 p-4 text-sm text-amber-50">
          Both souls reached their gates.
          {isFinalLevel ? " The rite is complete." : " A deeper chamber now opens."}
        </div>
      )}
    </div>
  );
}
