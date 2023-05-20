export type Graph = { [node: string]: { [neighbor: string]: number } };

export interface ShortestPathResult {
  time: number;
  path: string[];
}
