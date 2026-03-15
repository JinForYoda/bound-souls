import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ControlButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function ControlButton({ children, className = "", ...props }: ControlButtonProps) {
  return (
    <button
      className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-stone-100 transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
