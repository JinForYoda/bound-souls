import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ControlButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function ControlButton({ children, className = "", ...props }: ControlButtonProps) {
  return (
    <button
      className={`inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[rgba(240,210,170,0.18)] bg-[rgba(28,22,20,0.62)] px-4 py-2.5 text-sm font-medium text-[#fff1cf] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_24px_rgba(0,0,0,0.18)] transition hover:-translate-y-px hover:border-[rgba(240,210,170,0.3)] hover:bg-[rgba(32,24,22,0.74)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_30px_rgba(0,0,0,0.24)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
