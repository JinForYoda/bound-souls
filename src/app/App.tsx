import { useEffect } from "react";
import { levels } from "../game/levels";
import { useGameInput } from "./useGameInput";
import { useGameStore } from "../store/gameStore";
import { AppHeader } from "../ui/AppHeader";
import { GameCanvas } from "../ui/GameCanvas";
import { GameSidebar } from "../ui/GameSidebar";
import { LoadingScreen } from "../ui/LoadingScreen";

export function App() {
  useGameInput();

  const assetStatus = useGameStore((state) => state.assetStatus);
  const loadedAssetCount = useGameStore((state) => state.loadedAssetCount);
  const totalAssetCount = useGameStore((state) => state.totalAssetCount);
  const assetErrorMessage = useGameStore((state) => state.assetErrorMessage);
  const preloadAssets = useGameStore((state) => state.preloadAssets);
  const completedLevelCount = useGameStore((state) => state.completedLevelCount);
  const currentLevelIndex = useGameStore((state) => state.currentLevelIndex);
  const session = useGameStore((state) => state.session);
  const restartLevel = useGameStore((state) => state.restartLevel);
  const nextLevel = useGameStore((state) => state.nextLevel);
  const previousLevel = useGameStore((state) => state.previousLevel);
  const goToLevel = useGameStore((state) => state.goToLevel);
  const level = levels[currentLevelIndex];
  const accessibleLevelIndex = Math.min(levels.length - 1, completedLevelCount);
  const canAdvance = session.status === "won" && currentLevelIndex < levels.length - 1;
  const isFinalLevel = currentLevelIndex === levels.length - 1;

  useEffect(() => {
    void preloadAssets();
  }, [preloadAssets]);

  if (assetStatus !== "ready") {
    return (
      <LoadingScreen
        assetStatus={assetStatus}
        loadedAssetCount={loadedAssetCount}
        totalAssetCount={totalAssetCount}
        assetErrorMessage={assetErrorMessage}
        onRetry={() => void preloadAssets()}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07070b] text-[#f5ecdf]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(228,154,84,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(119,109,220,0.16),transparent_26%),radial-gradient(circle_at_bottom,rgba(48,41,58,0.7),transparent_42%),linear-gradient(180deg,#07070b_0%,#0b0a10_38%,#121017_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(circle_at_center,black_35%,transparent_88%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(240,181,109,0.08),transparent_26%),radial-gradient(circle_at_84%_24%,rgba(143,139,232,0.08),transparent_30%),radial-gradient(circle_at_50%_0%,rgba(255,245,230,0.08),transparent_20%),linear-gradient(180deg,transparent,rgba(0,0,0,0.28))]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1310px] flex-col px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-5">
        <AppHeader />

        <main className="grid flex-1 items-start gap-6 lg:grid-cols-[minmax(0,920px)_360px] lg:justify-center">
          <section className="min-w-0">
            <div className="w-full">
              <GameCanvas level={level} session={session} />
            </div>
          </section>

          <GameSidebar
            levels={levels}
            completedLevelCount={completedLevelCount}
            currentLevelIndex={currentLevelIndex}
            session={session}
            canAdvance={canAdvance}
            accessibleLevelIndex={accessibleLevelIndex}
            isFinalLevel={isFinalLevel}
            onPrevious={previousLevel}
            onRestart={restartLevel}
            onNext={nextLevel}
            onSelectLevel={goToLevel}
          />
        </main>
      </div>
    </div>
  );
}
