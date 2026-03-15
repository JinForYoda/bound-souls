import { getRequiredWorldObjectByType } from "../core/worldObjects";
import { WorldObjectType, type LevelData, type PlayersState, type SessionState } from "../core/types";

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
  const lightExit = getRequiredWorldObjectByType(level.light, WorldObjectType.Exit);
  const shadowExit = getRequiredWorldObjectByType(level.shadow, WorldObjectType.Exit);

  return (
    players.light.x === lightExit.position.x &&
    players.light.y === lightExit.position.y &&
    players.shadow.x === shadowExit.position.x &&
    players.shadow.y === shadowExit.position.y
  );
}
