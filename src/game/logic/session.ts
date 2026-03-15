import type { LevelData, PlayersState, SessionState } from "../core/types";

export function createSessionState(level: LevelData): SessionState {
  return {
    players: {
      light: { ...level.light.start },
      shadow: { ...level.shadow.start },
    },
    moveCount: 0,
    status: "playing",
    animation: null,
  };
}

export function isSolved(level: LevelData, players: PlayersState): boolean {
  return (
    players.light.x === level.light.exit.x &&
    players.light.y === level.light.exit.y &&
    players.shadow.x === level.shadow.exit.x &&
    players.shadow.y === level.shadow.exit.y
  );
}
