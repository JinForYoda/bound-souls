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
    <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="panel-surface loading-panel w-full max-w-2xl rounded-[2rem] p-8 shadow-panel sm:p-10">
        <div className="loading-sigil">
          <div className="loading-sigil__ring loading-sigil__ring--light" />
          <div className="loading-sigil__ring loading-sigil__ring--shadow" />
          <div className="loading-sigil__core" />
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Awakening The Chamber</p>
        <h1 className="mt-4 font-display text-5xl leading-none text-stone-100 sm:text-6xl">
          Bound Souls
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-stone-300 sm:text-base">
          Summoning relics from light and shadow before the rite begins.
        </p>

        <div className="mt-8">
          <div className="h-2 overflow-hidden rounded-full bg-white/8">
            <div
              className="loading-progress h-full rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-stone-400">
            <span>{assetStatus === "error" ? "Load Failed" : "Preparing Assets"}</span>
            <span>
              {loadedAssetCount} / {totalAssetCount}
            </span>
          </div>
          {assetErrorMessage && (
            <>
              <p className="mt-4 text-sm text-amber-200">{assetErrorMessage}</p>
              <div className="mt-5">
                <ControlButton onClick={onRetry}>Retry</ControlButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
