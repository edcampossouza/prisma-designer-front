import { createContext } from "react";

export type PositionsRecord = Record<string, { x: number; y: number }>;
// maps model names to a position on the screen
export type GraphicContextType = {
  positions: PositionsRecord;
  addPosition: (name: string, { x, y }: { x: number; y: number }) => void;
  setPositions: React.Dispatch<React.SetStateAction<PositionsRecord>>;
  x_bound: number;
  y_bound: number;
};

export const GraphicContext = createContext<GraphicContextType>({
  positions: {},
  addPosition: () => {},
  setPositions: () => {},
  x_bound: 0,
  y_bound: 0,
});
