export type Graph = { [node: string]: { [neighbor: string]: number } };

export interface ShortestPathResult {
  distance: number;
  path: string[];
}
