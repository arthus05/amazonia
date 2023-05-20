import { Graph, ShortestPathResult } from "./interface";

export function dijkstra(graph: Graph, startNode: string, endNode: string): ShortestPathResult {
  const times: { [node: string]: number } = {};
  const previous: { [node: string]: string | null } = {};
  const priorityQueue = new Set<string>();

  if (!graph[startNode] || !graph[endNode]) {
    throw new Error('Start or end node does not exist in the graph!');
  }

  if (startNode === endNode) {
    return { time: 0, path: [startNode] };
  }

  // Initialize times and priority queue
  for (const node in graph) {
    if (node === startNode) {
      times[node] = 0;
    } else {
      times[node] = Infinity;
    }
    priorityQueue.add(node);
  }

  while (priorityQueue.size > 0) {
    // Find the node with the smallest time
    let smallestTime = Infinity;
    let smallestNode: string | null = null;


    for (const node of priorityQueue) {
      if (times[node] < smallestTime) {
        smallestTime = times[node];
        smallestNode = node;
      }
    }

    if (smallestNode === null || smallestNode === endNode) {
      break; // Reached the end node or no more reachable nodes
    }

    priorityQueue.delete(smallestNode);

    // Update distances to neighbors
    for (const neighbor in graph[smallestNode]) {
      const time = parseFloat((times[smallestNode] + graph[smallestNode][neighbor]).toFixed(2));
      if (time < times[neighbor]) {
        times[neighbor] = time;
        previous[neighbor] = smallestNode;
      }
    }
  }

  // Build the path
  const path: string[] = [];
  let current: string | null = endNode;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  if (path.length === 1 && path[0] === endNode) {
    return { time: Infinity, path: [] };
  }

  return { time: times[endNode], path };
}
