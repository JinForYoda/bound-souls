import { describe, expect, it } from "vitest";
import { getWorldObjectDefinition, WorldObjectRenderVariant } from "./worldObjectDefinitions";
import { WorldObjectType } from "./types";

describe("worldObjectDefinitions", () => {
  it("declares exits as goal objects", () => {
    const exit = getWorldObjectDefinition(WorldObjectType.Exit);

    expect(exit.isGoal).toBe(true);
    expect(exit.renderVariant).toBe(WorldObjectRenderVariant.Exit);
  });
});
