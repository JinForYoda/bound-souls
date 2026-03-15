export function ControlsPanel() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(22,18,24,0.88)] shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(240,181,109,0.08),transparent_28%),linear-gradient(315deg,rgba(143,139,232,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-[14px] rounded-[18px] border border-white/[0.05]" />

      <div className="relative z-10 p-5 sm:p-6">
        <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[rgba(233,223,211,0.5)]">
          Ritual Controls
        </p>
        <div className="mt-5 grid gap-3">
          <div className="flex items-center justify-between gap-4 rounded-[18px] border border-white/10 bg-white/[0.025] px-4 py-3 max-sm:flex-col max-sm:items-start">
            <span className="text-sm text-[rgba(233,223,211,0.72)]">Move</span>
            <strong className="text-sm uppercase tracking-[0.08em] text-[#fff1cf]">
              WASD / Arrow Keys
            </strong>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-[18px] border border-white/10 bg-white/[0.025] px-4 py-3 max-sm:flex-col max-sm:items-start">
            <span className="text-sm text-[rgba(233,223,211,0.72)]">Reset</span>
            <strong className="text-sm uppercase tracking-[0.08em] text-[#fff1cf]">R</strong>
          </div>
        </div>
        <p className="mt-4 text-[0.92rem] leading-[1.66] text-[rgba(233,223,211,0.72)]">
          Both souls attempt the same step. If either path is sealed, the chamber denies the move.
        </p>
      </div>
    </div>
  );
}
