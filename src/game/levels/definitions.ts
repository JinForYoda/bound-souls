import type { RawLevelDefinition } from "./parseLevel";

export const rawLevels: RawLevelDefinition[] = [
  {
    id: "twin-steps",
    name: "Ashen Threshold",
    light: [
      "##########",
      "#P..X..###",
      "#.X....###",
      "#..X..E.##",
      "##.XXX..##",
      "##########",
    ],
    shadow: [
      "##########",
      "#P..XX..##",
      "##...X.###",
      "#.X...E.##",
      "#..XX...##",
      "##########",
    ],
  },
  {
    id: "split-corridors",
    name: "Severed Cloister",
    light: [
      "##########",
      "#P..X...##",
      "#.X..X.###",
      "##...X..##",
      "##..E.####",
      "##########",
    ],
    shadow: [
      "##########",
      "##P..X..##",
      "#..X..X.##",
      "#.X...X.##",
      "###..E.###",
      "##########",
    ],
  },
  {
    id: "echo-turn",
    name: "Last Concord",
    light: [
      "##########",
      "#P.X..X.##",
      "##....X.##",
      "##.X..E.##",
      "#..XX..###",
      "##########",
    ],
    shadow: [
      "##########",
      "##P.X..###",
      "#.X....###",
      "##..X..E##",
      "#..XXX..##",
      "##########",
    ],
  },
];
