import { levels } from "../src/game/levels";
import { attemptMove } from "../src/game/logic/movement";
import type { Direction, LevelData, PlayersState } from "../src/game/core/types";

const DIRECTIONS: Direction[] = ["up", "down", "left", "right"];

interface SolveResult {
  path: Direction[] | null;
  exploredStates: number;
}

function createStateKey(players: PlayersState): string {
  return `${players.light.x},${players.light.y}|${players.shadow.x},${players.shadow.y}`;
}

function solveLevel(level: LevelData): SolveResult {
  const start: PlayersState = {
    light: { ...level.light.start },
    shadow: { ...level.shadow.start },
  };
  const queue: Array<{ players: PlayersState; path: Direction[] }> = [{ players: start, path: [] }];
  const visited = new Set<string>([createStateKey(start)]);

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current) {
      break;
    }

    for (const direction of DIRECTIONS) {
      const result = attemptMove(level, current.players, direction);

      if (!result.moved) {
        continue;
      }

      const stateKey = createStateKey(result.players);

      if (visited.has(stateKey)) {
        continue;
      }

      const nextPath = [...current.path, direction];

      if (result.won) {
        return {
          path: nextPath,
          exploredStates: visited.size + 1,
        };
      }

      visited.add(stateKey);
      queue.push({
        players: result.players,
        path: nextPath,
      });
    }
  }

  return {
    path: null,
    exploredStates: visited.size,
  };
}

function findLevelById(levelId: string): LevelData | undefined {
  return levels.find((level) => level.id === levelId);
}

function printLevelSolution(level: LevelData): void {
  const solution = solveLevel(level);

  if (!solution.path) {
    console.log(`${level.id}: unsolved (explored ${solution.exploredStates} states)`);
    return;
  }

  console.log(
    `${level.id}: ${solution.path.length} moves (explored ${solution.exploredStates} states)`,
  );
  console.log(`  path: ${solution.path.join(" ")}`);
}

function printUsage(): void {
  console.log("Usage:");
  console.log("  bun run solve:levels");
  console.log("  bun run solve:levels <level-id>");
}

function main(): void {
  const [, , levelId] = process.argv;

  if (!levelId) {
    for (const level of levels) {
      printLevelSolution(level);
    }
    return;
  }

  if (levelId === "--help" || levelId === "-h") {
    printUsage();
    return;
  }

  const level = findLevelById(levelId);

  if (!level) {
    console.error(`Unknown level id: ${levelId}`);
    printUsage();
    process.exitCode = 1;
    return;
  }

  printLevelSolution(level);
}

main();
