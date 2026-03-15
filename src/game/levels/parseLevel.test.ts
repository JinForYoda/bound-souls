import { LevelSymbol } from "../core/levelSymbols";
import { describe, expect, it } from "vitest";
import { parseLevel } from "./parseLevel";

describe("parseLevel", () => {
  it("parses tile maps into typed level data", () => {
    const level = parseLevel({
      id: "parser-smoke",
      name: "Parser Smoke",
      light: ["#####", "#P.E#", "#####"],
      shadow: ["#####", "#P.E#", "#####"],
    });

    expect(level.width).toBe(5);
    expect(level.height).toBe(3);
    expect(level.light.start).toEqual({ x: 1, y: 1 });
    expect(level.shadow.exit).toEqual({ x: 3, y: 1 });
    expect(level.light.symbols[0][0]).toBe(LevelSymbol.BoundaryWall);
    expect(level.light.symbols[1][1]).toBe(LevelSymbol.Start);
    expect(level.light.symbols[1][2]).toBe(LevelSymbol.Empty);
    expect(level.light.symbols[1][3]).toBe(LevelSymbol.Exit);
  });

  it("preserves declared wall and obstacle symbols in the parsed world grid", () => {
    const level = parseLevel({
      id: "wall-semantics",
      name: "Wall Semantics",
      light: ["#####", "#PXE#", "#####"],
      shadow: ["#####", "#PXE#", "#####"],
    });

    expect(level.light.symbols[0][2]).toBe(LevelSymbol.BoundaryWall);
    expect(level.light.symbols[1][2]).toBe(LevelSymbol.Obstacle);
  });

  it("throws when worlds have different dimensions", () => {
    expect(() =>
      parseLevel({
        id: "bad-size",
        name: "Bad Size",
        light: ["#####", "#P.E#", "#####"],
        shadow: ["####", "#PE#", "####"],
      }),
    ).toThrow("worlds must be the same size");
  });

  it("throws when a world contains multiple starts", () => {
    expect(() =>
      parseLevel({
        id: "bad-start",
        name: "Bad Start",
        light: ["#####", "#PPE#", "#####"],
        shadow: ["#####", "#P.E#", "#####"],
      }),
    ).toThrow("contains more than one start");
  });

  it("throws when a world is missing an exit", () => {
    expect(() =>
      parseLevel({
        id: "missing-exit",
        name: "Missing Exit",
        light: ["#####", "#P..#", "#####"],
        shadow: ["#####", "#P.E#", "#####"],
      }),
    ).toThrow("must contain one start and one exit");
  });
});
