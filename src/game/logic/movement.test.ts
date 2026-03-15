import { describe, expect, it } from "vitest";
import { parseLevel } from "../levels/parseLevel";
import { attemptMove } from "./movement";
import { createSessionState, isSolved } from "./session";

function buildLevel() {
  return parseLevel({
    id: "test-level",
    name: "Test Level",
    light: ["#####", "#P.E#", "#...#", "#####"],
    shadow: ["#####", "#P.E#", "#...#", "#####"],
  });
}

describe("movement", () => {
  it("moves both players when both worlds can advance", () => {
    const level = buildLevel();
    const session = createSessionState(level);

    const result = attemptMove(level, session.players, "right");

    expect(result.moved).toBe(true);
    expect(result.players).toEqual({
      light: { x: 2, y: 1 },
      shadow: { x: 2, y: 1 },
    });
    expect(result.won).toBe(false);
  });

  it("cancels the move when one world is blocked", () => {
    const level = parseLevel({
      id: "desync-block",
      name: "Desync Block",
      light: ["#####", "#P.E#", "#####"],
      shadow: ["#####", "#P#E#", "#####"],
    });
    const session = createSessionState(level);

    const result = attemptMove(level, session.players, "right");

    expect(result.moved).toBe(false);
    expect(result.players).toEqual(session.players);
    expect(result.won).toBe(false);
  });

  it("marks the level as won when both players reach exits after a move", () => {
    const level = buildLevel();
    const session = createSessionState(level);
    const firstMove = attemptMove(level, session.players, "right");

    const result = attemptMove(level, firstMove.players, "right");

    expect(result.moved).toBe(true);
    expect(result.won).toBe(true);
    expect(isSolved(level, result.players)).toBe(true);
  });

  it("creates session state from declared start positions", () => {
    const level = parseLevel({
      id: "custom-starts",
      name: "Custom Starts",
      light: ["#####", "#..E#", "#P..#", "#####"],
      shadow: ["#####", "#P.E#", "#...#", "#####"],
    });

    const session = createSessionState(level);

    expect(session.players).toEqual({
      light: { x: 1, y: 2 },
      shadow: { x: 1, y: 1 },
    });
    expect(session.status).toBe("playing");
    expect(session.moveCount).toBe(0);
  });
});
