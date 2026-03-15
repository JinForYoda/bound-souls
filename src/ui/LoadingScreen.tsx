import { ControlButton } from "./ControlButton";

interface LoadingScreenProps {
  assetStatus: "idle" | "loading" | "ready" | "error";
  loadedAssetCount: number;
  totalAssetCount: number;
  assetErrorMessage: string | null;
  onRetry: () => void;
}

export function LoadingScreen({
  assetStatus,
  loadedAssetCount,
  totalAssetCount,
  assetErrorMessage,
  onRetry,
}: LoadingScreenProps) {
  const progressPercent =
    totalAssetCount === 0 ? 100 : Math.round((loadedAssetCount / totalAssetCount) * 100);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070b] px-4 py-5 text-[#f5ecdf] sm:px-5 sm:py-6 lg:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(228,154,84,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(119,109,220,0.16),transparent_26%),radial-gradient(circle_at_bottom,rgba(48,41,58,0.7),transparent_42%),linear-gradient(180deg,#07070b_0%,#0b0a10_38%,#121017_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(circle_at_center,black_35%,transparent_88%)]" />

      <div className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(22,18,24,0.88)] px-5 py-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:px-6 sm:py-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,244,226,0.05),transparent_26%),linear-gradient(135deg,rgba(240,181,109,0.1),transparent_26%),linear-gradient(315deg,rgba(143,139,232,0.1),transparent_28%)]" />

        <div className="relative z-10 mx-auto mb-6 aspect-square w-[min(78vw,320px)]">
          <div className="absolute inset-0 rounded-full border border-white/15 shadow-[0_0_40px_rgba(240,181,109,0.18)] animate-[loading-drift-light_3s_ease-in-out_infinite]" />
          <div className="absolute inset-[22px] rounded-full border border-[#8f8be8]/30 shadow-[0_0_34px_rgba(143,139,232,0.14)] animate-[loading-drift-shadow_2.5s_ease-in-out_infinite]" />
          <div className="absolute inset-[42px] flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,247,214,0.95),rgba(255,197,111,0.72)_38%,rgba(44,28,16,0.16)_72%),radial-gradient(circle_at_65%_70%,rgba(205,191,255,0.8),transparent_55%)] animate-[loading-pulse_1.8s_ease-in-out_infinite]">
            <img src="/assets/logo.png" alt="" className="h-[88%] w-[88%] object-contain drop-shadow-[0_0_12px_rgba(255,250,239,0.28)]" />
          </div>
        </div>

        <p className="relative z-10 text-[0.72rem] uppercase tracking-[0.32em] text-[rgba(233,223,211,0.5)]">
          Awakening The Chamber
        </p>
        <h1 className="relative z-10 mt-3 font-display text-[clamp(3.2rem,9vw,5.75rem)] leading-[0.92] tracking-[0.02em] text-[#fff1cf]">
          Bound Souls
        </h1>
        <p className="relative z-10 mx-auto mt-3 max-w-[30rem] text-[0.98rem] leading-[1.72] text-[rgba(233,223,211,0.72)]">
          Summoning relics from light and shadow before the rite begins.
        </p>

        <div className="relative z-10 mx-auto mt-6 max-w-xl">
          <div className="h-3 overflow-hidden rounded-full border border-white/[0.05] bg-white/[0.05]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#f0b56d,#d9c8ff)] shadow-[0_0_18px_rgba(240,181,109,0.24)] transition-[width] duration-200 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-[rgba(233,223,211,0.5)] max-sm:flex-col max-sm:items-start">
            <span>{assetStatus === "error" ? "Load Failed" : "Preparing Assets"}</span>
            <span>
              {loadedAssetCount} / {totalAssetCount}
            </span>
          </div>
          {assetErrorMessage && (
            <>
              <p className="mt-4 text-left text-[0.92rem] leading-[1.6] text-[#f3c697]">
                {assetErrorMessage}
              </p>
              <div className="mt-4 text-left">
                <ControlButton onClick={onRetry}>Retry</ControlButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
