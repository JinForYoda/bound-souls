import { describe, expect, it } from "vitest";
import { parseLevel } from "../levels/parseLevel";
import { canEnterTile } from "./tileBehaviors";

describe("tileBehaviors", () => {
  const level = parseLevel({
    id: "tile-rules",
    name: "Tile Rules",
    light: [
      "#####",
      "#P.E#",
      "#####",
    ],
    shadow: [
      "#####",
      "#P.E#",
      "#####",
    ],
  });

  it("allows entering empty tiles", () => {
    expect(canEnterTile(level.light, { x: 2, y: 1 })).toBe(true);
  });

  it("allows entering exit symbols", () => {
    expect(canEnterTile(level.light, { x: 3, y: 1 })).toBe(true);
  });

  it("blocks wall tiles", () => {
    expect(canEnterTile(level.light, { x: 0, y: 0 })).toBe(false);
  });

  it("blocks positions outside world bounds", () => {
    expect(canEnterTile(level.light, { x: -1, y: 1 })).toBe(false);
    expect(canEnterTile(level.light, { x: 10, y: 1 })).toBe(false);
  });
});
