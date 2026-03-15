interface LevelBadgeProps {
  index: number;
  active: boolean;
  locked: boolean;
  onClick: () => void;
}

export function LevelBadge({ index, active, locked, onClick }: LevelBadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
        active
          ? "border-amber-300/50 bg-amber-200/15 text-amber-100 shadow-[0_0_24px_rgba(255,184,108,0.2)]"
          : "border-white/10 bg-white/5 text-stone-300 hover:border-white/20 hover:bg-white/10"
      } ${locked ? "cursor-not-allowed border-white/5 text-stone-600" : ""}`}
      aria-label={`Level ${index + 1}`}
    >
      {index + 1}
    </button>
  );
}

