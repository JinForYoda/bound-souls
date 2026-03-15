import type { ReactNode } from "react";

type BadgeVariant = "chip" | "stat" | "row";
type BadgeTone = "default" | "light" | "shadow";

interface BadgeProps {
  label: ReactNode;
  value?: ReactNode;
  variant?: BadgeVariant;
  tone?: BadgeTone;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

const chipToneClassName: Record<BadgeTone, string> = {
  default: "",
  light:
    "before:size-2 before:rounded-full before:bg-[#f0b56d] before:shadow-[0_0_12px_rgba(240,181,109,0.6)] before:content-['']",
  shadow:
    "before:size-2 before:rounded-full before:bg-[#8f8be8] before:shadow-[0_0_12px_rgba(143,139,232,0.55)] before:content-['']",
};

export function Badge({
  label,
  value,
  variant = "stat",
  tone = "default",
  className = "",
  labelClassName = "",
  valueClassName = "",
}: BadgeProps) {
  if (variant === "chip") {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[0.78rem] uppercase tracking-[0.22em] ${chipToneClassName[tone]} ${className}`}
      >
        {label}
      </span>
    );
  }

  if (variant === "row") {
    return (
      <div
        className={`flex items-center justify-between gap-4 rounded-[18px] border border-white/10 bg-white/[0.025] px-4 py-3 max-sm:flex-col max-sm:items-start ${className}`}
      >
        <span className={`text-sm text-[rgba(233,223,211,0.72)] ${labelClassName}`}>{label}</span>
        <strong className={`text-sm uppercase tracking-[0.08em] text-[#fff1cf] ${valueClassName}`}>
          {value}
        </strong>
      </div>
    );
  }

  return (
    <div className={`rounded-[18px] border border-white/10 bg-white/[0.025] px-3 py-3 ${className}`}>
      <p className={`text-[0.72rem] uppercase tracking-[0.24em] text-[rgba(233,223,211,0.5)] ${labelClassName}`}>
        {label}
      </p>
      <p className={`mt-1.5 font-bold text-[#fff1cf] ${valueClassName}`}>{value}</p>
    </div>
  );
}
