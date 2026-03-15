export function AppHeader() {
  return (
    <header className="relative mb-4 overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(22,18,24,0.88)] shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:mb-5">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(240,181,109,0.08),transparent_28%),linear-gradient(315deg,rgba(143,139,232,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-[14px] rounded-[18px] border border-white/[0.05]" />

      <div className="relative z-10 flex flex-col items-center px-5 py-5 text-center sm:px-7 sm:py-6 lg:px-8 lg:py-5">
        <div className="relative mb-4 size-32 rounded-[28px] border border-[#fff1cf]/15 bg-[radial-gradient(circle_at_30%_30%,rgba(255,222,180,0.12),transparent_44%),radial-gradient(circle_at_70%_70%,rgba(143,139,232,0.16),transparent_42%),rgba(11,10,15,0.64)] shadow-[0_16px_40px_rgba(0,0,0,0.34)] before:pointer-events-none before:absolute before:inset-[8px] before:rounded-[22px] before:border before:border-[#fff1cf]/10 sm:size-36 lg:size-40">
          <img
            src="/assets/logo.png"
            alt="Bound Souls logo"
            className="size-full object-contain p-4 drop-shadow-[0_0_18px_rgba(240,181,109,0.14)] sm:p-5"
          />
        </div>

        <div className="max-w-4xl">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[rgba(233,223,211,0.5)]">
            Temple Relic Puzzle
          </p>
          <h1 className="mt-2 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.92] tracking-[0.02em] text-[#fff1cf]">
            Bound Souls
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-[0.95rem] leading-[1.6] text-[rgba(233,223,211,0.72)]">
            Guide two tethered souls through warm light and cold shadow. Every step demands perfect
            accord between both worlds.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2.5" aria-label="World identities">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[0.78rem] uppercase tracking-[0.22em] before:size-2 before:rounded-full before:bg-[#f0b56d] before:shadow-[0_0_12px_rgba(240,181,109,0.6)] before:content-['']">
            Light World
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[0.78rem] uppercase tracking-[0.22em] before:size-2 before:rounded-full before:bg-[#8f8be8] before:shadow-[0_0_12px_rgba(143,139,232,0.55)] before:content-['']">
            Shadow World
          </span>
        </div>
      </div>
    </header>
  );
}
