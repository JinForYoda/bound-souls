interface LevelBadgeProps {
  index: number;
  active: boolean;
  completed: boolean;
  locked: boolean;
  onClick: () => void;
}

export function LevelBadge({
  index,
  active,
  completed,
  locked,
  onClick,
}: LevelBadgeProps) {
  const stateClassName = active
    ? "border-[rgba(240,181,109,0.4)] bg-[rgba(40,27,20,0.5)] text-[#fff1cf] shadow-[0_0_22px_rgba(240,181,109,0.18)]"
    : completed
      ? "border-[rgba(121,203,169,0.24)] bg-[rgba(18,31,28,0.4)] text-[#eaf7ef] shadow-[0_0_18px_rgba(121,203,169,0.12)]"
      : "border-white/10 bg-white/[0.03] text-[rgba(233,223,211,0.72)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      className={`inline-flex size-12 cursor-pointer items-center justify-center rounded-[18px] border text-[0.92rem] font-bold transition hover:-translate-y-px ${stateClassName} ${
        locked
          ? "cursor-not-allowed border-white/[0.04] bg-white/[0.02] text-[rgba(233,223,211,0.28)] shadow-none"
          : ""
      }`}
      aria-label={`Level ${index + 1}`}
    >
      <span>{index + 1}</span>
    </button>
  );
}
