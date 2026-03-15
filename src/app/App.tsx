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
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <AppHeader />

        <main className="grid flex-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
          <section className="order-2 space-y-5 lg:order-1">
            <div className="mx-auto w-full max-w-4xl">
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
