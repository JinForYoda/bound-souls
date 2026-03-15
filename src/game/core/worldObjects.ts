import { WorldObjectType, type WorldData, type WorldObject } from "./types";

export function findWorldObjectByType(
  world: WorldData,
  type: WorldObjectType,
): WorldObject | undefined {
  return world.objects.find((object) => object.type === type);
}

export function getRequiredWorldObjectByType(world: WorldData, type: WorldObjectType): WorldObject {
  const object = findWorldObjectByType(world, type);

  if (!object) {
    throw new Error(`World is missing required object "${type}".`);
  }

  return object;
}

