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

  it('should find the shortest path and time between two nodes', () => {
    const startNode = 'A';
    const endNode = 'D';

    const result: ShortestPathResult = dijkstra(graph, startNode, endNode);

    expect(result.time).toBe(6);
    expect(result.path).toEqual(['A', 'B', 'D']);
  });

  it('should return Infinity time if there is no path between nodes', () => {
    const startNode = 'A';
    const endNode = 'E';

    const result: ShortestPathResult = dijkstra(graph, startNode, endNode);

    expect(result.time).toBe(Infinity);
    expect(result.path).toEqual([]);
  });

  it('should return 0 time if start and end nodes are the same', () => {
    const startNode = 'A';
    const endNode = 'A';

    const result: ShortestPathResult = dijkstra(graph, startNode, endNode);

    expect(result.time).toBe(0);
    expect(result.path).toEqual(['A']);
  });

  it('should throw an error if start or end node does not exist in the graph', () => {
    const startNode = 'A';
    const endNode = 'F';

    expect(() => dijkstra(graph, startNode, endNode)).toThrowError('Start or end node does not exist in the graph!');
  })
});
