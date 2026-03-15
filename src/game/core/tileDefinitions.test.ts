import { describe, expect, it } from "vitest";
import { getTileDefinition, TileRenderVariant } from "./tileDefinitions";
import { TileType } from "./types";

describe("tileDefinitions", () => {
  it("declares walls as blocking tiles", () => {
    const wall = getTileDefinition(TileType.Wall);

    expect(wall.blocksMovement).toBe(true);
    expect(wall.isGoal).toBe(false);
    expect(wall.renderVariant).toBe(TileRenderVariant.Wall);
  });

  it("declares empty tiles as traversable floor", () => {
    const floor = getTileDefinition(TileType.Empty);

    expect(floor.blocksMovement).toBe(false);
    expect(floor.isGoal).toBe(false);
    expect(floor.renderVariant).toBe(TileRenderVariant.Floor);
  });
});
