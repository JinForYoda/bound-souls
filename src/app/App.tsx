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
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-stone-400">Portfolio MVP</p>
            <h1 className="font-display text-5xl leading-none text-stone-100 sm:text-6xl">
              Bound Souls
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-300 sm:text-base">
              Guide two tethered souls through warm light and cold shadow. Every step demands perfect accord between both worlds.
            </p>
          </div>

          <div className="panel-surface rounded-[1.75rem] px-5 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Controls</p>
            <p className="mt-2 text-sm text-stone-200">WASD or arrow keys to move. R to restart.</p>
          </div>
        </header>

        <main className="grid flex-1 gap-6 lg:grid-cols-[320px,minmax(0,1fr)]">
          <section className="space-y-5">
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
          </section>

          <section className="min-w-0">
            <GameCanvas level={level} session={session} />
          </section>
        </main>
      </div>
    </div>
  );
}
