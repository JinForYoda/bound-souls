import { TileType } from "../core/types";
import { WorldObjectType } from "../core/types";
import { describe, expect, it } from "vitest";
import { parseLevel } from "./parseLevel";

describe("parseLevel", () => {
  it("parses tile maps into typed level data", () => {
    const level = parseLevel({
      id: "parser-smoke",
      name: "Parser Smoke",
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

    expect(level.width).toBe(5);
    expect(level.height).toBe(3);
    expect(level.light.start).toEqual({ x: 1, y: 1 });
    expect(level.shadow.objects[0]).toEqual({
      type: WorldObjectType.Exit,
      position: { x: 3, y: 1 },
    });
    expect(level.light.tiles[1][2]).toBe(TileType.Empty);
    expect(level.light.tiles[1][3]).toBe(TileType.Empty);
  });

  it("throws when worlds have different dimensions", () => {
    expect(() =>
      parseLevel({
        id: "bad-size",
        name: "Bad Size",
        light: [
          "#####",
          "#P.E#",
          "#####",
        ],
        shadow: [
          "####",
          "#PE#",
          "####",
        ],
      }),
    ).toThrow("worlds must be the same size");
  });

  it("throws when a world contains multiple starts", () => {
    expect(() =>
      parseLevel({
        id: "bad-start",
        name: "Bad Start",
        light: [
          "#####",
          "#PPE#",
          "#####",
        ],
        shadow: [
          "#####",
          "#P.E#",
          "#####",
        ],
      }),
    ).toThrow("contains more than one start");
  });

  it("throws when a world is missing an exit", () => {
    expect(() =>
      parseLevel({
        id: "missing-exit",
        name: "Missing Exit",
        light: [
          "#####",
          "#P..#",
          "#####",
        ],
        shadow: [
          "#####",
          "#P.E#",
          "#####",
        ],
      }),
    ).toThrow("must contain one start and one exit");
  });
});
