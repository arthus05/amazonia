import { dijkstra } from './dijkstra';
import { Graph, ShortestPathResult } from './interface';

describe('dijkstra', () => {
  const graph: Graph = {
    A: { B: 5, C: 3 },
    B: { A: 5, C: 2, D: 1 },
    C: { A: 3, B: 2, D: 6 },
    D: { B: 1, C: 6 },
    E: {}
  };

  it('should find the shortest path and distance between two nodes', () => {
    const startNode = 'A';
    const endNode = 'D';

    const result: ShortestPathResult = dijkstra(graph, startNode, endNode);

    expect(result.distance).toBe(6);
    expect(result.path).toEqual(['A', 'B', 'D']);
  });

  it('should return Infinity distance if there is no path between nodes', () => {
    const startNode = 'A';
    const endNode = 'E';

    const result: ShortestPathResult = dijkstra(graph, startNode, endNode);

    expect(result.distance).toBe(Infinity);
    expect(result.path).toEqual([]);
  });
});
