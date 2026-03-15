import { LevelSymbol } from "./core/levelSymbols";
import { symbolLogic, type SymbolLogicDefinition } from "./logic/symbolLogic";
import { symbolRender, type SymbolRenderDefinition } from "./render/symbolRender";

export interface SymbolDefinition {
  logic: SymbolLogicDefinition;
  render: SymbolRenderDefinition;
}

export const symbolDefinitions: Record<LevelSymbol, SymbolDefinition> = {
  [LevelSymbol.BoundaryWall]: {
    logic: symbolLogic[LevelSymbol.BoundaryWall],
    render: symbolRender[LevelSymbol.BoundaryWall],
  },
  [LevelSymbol.Obstacle]: {
    logic: symbolLogic[LevelSymbol.Obstacle],
    render: symbolRender[LevelSymbol.Obstacle],
  },
  [LevelSymbol.Empty]: {
    logic: symbolLogic[LevelSymbol.Empty],
    render: symbolRender[LevelSymbol.Empty],
  },
  [LevelSymbol.Start]: {
    logic: symbolLogic[LevelSymbol.Start],
    render: symbolRender[LevelSymbol.Start],
  },
  [LevelSymbol.Exit]: {
    logic: symbolLogic[LevelSymbol.Exit],
    render: symbolRender[LevelSymbol.Exit],
  },
};
