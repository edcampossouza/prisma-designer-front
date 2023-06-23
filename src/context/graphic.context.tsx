import { createContext } from "react";

export type PositionsRecord = Record<string, { x: number; y: number }>;
// maps model names to a position on the screen
export type GraphicContextType = {
  positions: PositionsRecord;
  addPosition: (name: string, { x, y }: { x: number; y: number }) => void;
};

export const GraphicContext = createContext<GraphicContextType>({
  positions: {},
  addPosition: () => {},
});
