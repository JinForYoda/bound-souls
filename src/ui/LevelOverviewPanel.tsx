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
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(22,18,24,0.88)] shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(240,181,109,0.08),transparent_28%),linear-gradient(315deg,rgba(143,139,232,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-[14px] rounded-[18px] border border-white/[0.05]" />

      <div className="relative z-10 p-5 sm:p-6">
        <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[rgba(233,223,211,0.5)]">
          Current Chamber
        </p>
        <h2 className="mt-3 font-display text-[2.2rem] leading-[0.94] tracking-[0.02em] text-[#fff1cf]">
          {currentLevelIndex + 1}. {levelName}
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <div className="rounded-[20px] border border-white/10 bg-white/[0.025] p-4">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[rgba(233,223,211,0.5)]">
              Moves
            </p>
            <p className="mt-2 text-[2rem] font-bold text-[#fff1cf]">{session.moveCount}</p>
          </div>
          <div className="rounded-[20px] border border-white/10 bg-white/[0.025] p-4">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[rgba(233,223,211,0.5)]">
              Status
            </p>
            <p
              className={`mt-2 text-[1.35rem] font-bold ${
                session.status === "won" ? "text-[#f5d39e]" : "text-[#fff1cf]"
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
          <div className="mt-5 rounded-[20px] border border-[rgba(240,181,109,0.22)] bg-[rgba(39,26,19,0.5)] p-4 text-[0.95rem] leading-7 text-[#f6dfbf]">
            Both souls reached their gates.
            {isFinalLevel ? " The rite is complete." : " A deeper chamber now opens."}
          </div>
        )}
      </div>
    </div>
  );
}
