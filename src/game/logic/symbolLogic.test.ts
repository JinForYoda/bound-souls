import { describe, expect, it } from "vitest";
import { LevelSymbol } from "../core/levelSymbols";
import type { WorldData } from "../core/types";
import { symbolLogic } from "./symbolLogic";

function buildWorld(symbol: LevelSymbol): WorldData {
  return {
    symbols: [[symbol]],
    start: { x: 0, y: 0 },
    exit: { x: 0, y: 0 },
    width: 1,
    height: 1,
  };
}

describe("symbolLogic", () => {
  it("blocks wall-like symbols", () => {
    expect(symbolLogic[LevelSymbol.BoundaryWall].canEnter).not.toBe(
      symbolLogic[LevelSymbol.Empty].canEnter,
    );
    expect(
      symbolLogic[LevelSymbol.BoundaryWall].canEnter({
        world: buildWorld(LevelSymbol.BoundaryWall),
        point: { x: 0, y: 0 },
        symbol: LevelSymbol.BoundaryWall,
      }),
    ).toBe(false);
    expect(
      symbolLogic[LevelSymbol.Obstacle].canEnter({
        world: buildWorld(LevelSymbol.Obstacle),
        point: { x: 0, y: 0 },
        symbol: LevelSymbol.Obstacle,
      }),
    ).toBe(false);
  });

  it("marks start and exit symbols declaratively", () => {
    expect(symbolLogic[LevelSymbol.Start].isStart).toBe(true);
    expect(symbolLogic[LevelSymbol.Start].isExit).toBe(false);
    expect(symbolLogic[LevelSymbol.Exit].isStart).toBe(false);
    expect(symbolLogic[LevelSymbol.Exit].isExit).toBe(true);
  });
});
