import { WorldObjectType } from "./types";

export enum WorldObjectRenderVariant {
  Exit = "exit",
}

export interface WorldObjectDefinition {
  type: WorldObjectType;
  isGoal: boolean;
  renderVariant: WorldObjectRenderVariant;
}

export const worldObjectDefinitions: Record<WorldObjectType, WorldObjectDefinition> = {
  [WorldObjectType.Exit]: {
    type: WorldObjectType.Exit,
    isGoal: true,
    renderVariant: WorldObjectRenderVariant.Exit,
  },
};

export function getWorldObjectDefinition(type: WorldObjectType): WorldObjectDefinition {
  return worldObjectDefinitions[type];
}

