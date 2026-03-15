import { levels } from "../game/levels";
import { useGameInput } from "./useGameInput";
import { useGameStore } from "../store/gameStore";
import { ControlButton } from "../ui/ControlButton";
import { GameCanvas } from "../ui/GameCanvas";
import { LevelBadge } from "../ui/LevelBadge";

export function App() {
  useGameInput();

  const currentLevelIndex = useGameStore((state) => state.currentLevelIndex);
  const unlockedLevelIndex = useGameStore((state) => state.unlockedLevelIndex);
  const session = useGameStore((state) => state.session);
  const restartLevel = useGameStore((state) => state.restartLevel);
  const nextLevel = useGameStore((state) => state.nextLevel);
  const previousLevel = useGameStore((state) => state.previousLevel);
  const goToLevel = useGameStore((state) => state.goToLevel);
  const level = levels[currentLevelIndex];
  const canAdvance = session.status === "won" && currentLevelIndex < unlockedLevelIndex;
  const isFinalLevel = currentLevelIndex === levels.length - 1;

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <header className="mb-6 flex flex-col gap-3 lg:mb-5">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl leading-none text-stone-100 sm:text-6xl">
              Bound Souls
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-300 sm:text-base">
              Guide two tethered souls through warm light and cold shadow. Every step demands perfect accord between both worlds.
            </p>
          </div>
        </header>

        <main className="grid flex-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
          <section className="order-2 space-y-5 lg:order-1">
            <div className="mx-auto w-full max-w-4xl">
              <GameCanvas level={level} session={session} />
            </div>
          </section>

          <aside className="order-1 space-y-5 lg:order-2 lg:sticky lg:top-6">
            <div className="panel-surface rounded-[2rem] p-5 shadow-panel">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Current Level</p>
              <h2 className="mt-3 text-2xl font-semibold text-stone-50">
                {currentLevelIndex + 1}. {level.name}
              </h2>
              <p className="mt-2 text-sm text-stone-400">
                Unlocked {unlockedLevelIndex + 1} / {levels.length} chambers
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Moves</p>
                  <p className="mt-2 text-3xl font-semibold text-stone-100">{session.moveCount}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Status</p>
                  <p
                    className={`mt-2 text-lg font-semibold ${
                      session.status === "won" ? "text-amber-200" : "text-stone-100"
                    }`}
                  >
                    {session.status === "won" ? "Aligned" : "Unbound"}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <ControlButton onClick={previousLevel} disabled={currentLevelIndex === 0}>
                  Previous
                </ControlButton>
                <ControlButton onClick={restartLevel}>Restart</ControlButton>
                <ControlButton onClick={nextLevel} disabled={!canAdvance}>
                  {isFinalLevel ? "Completed" : "Next Level"}
                </ControlButton>
              </div>

              {session.status === "won" && (
                <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-200/10 p-4 text-sm text-amber-50">
                  Both souls reached their gates.
                  {isFinalLevel ? " The rite is complete." : " A deeper chamber now opens."}
                </div>
              )}
            </div>

            <div className="panel-surface rounded-[2rem] p-5 shadow-panel">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Controls</p>
              <p className="mt-3 text-sm leading-6 text-stone-200">
                Move with WASD or the arrow keys. Press R to restart the chamber.
              </p>
            </div>

            <div className="panel-surface rounded-[2rem] p-5 shadow-panel">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Progress</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {levels.map((entry, index) => (
                  <LevelBadge
                    key={entry.id}
                    index={index}
                    active={index === currentLevelIndex}
                    locked={index > unlockedLevelIndex}
                    onClick={() => goToLevel(index)}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-300">
                The souls move as one, but the worlds do not mirror each other. If either path is blocked, the step is denied to both.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
