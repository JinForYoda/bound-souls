export enum LevelSymbol {
  BoundaryWall = "#",
  Obstacle = "X",
  Empty = ".",
  Start = "P",
  Exit = "E",
}

const levelSymbolSet = new Set<string>(Object.values(LevelSymbol));

export function isLevelSymbol(value: string): value is LevelSymbol {
  return levelSymbolSet.has(value);
}
