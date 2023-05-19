import { Graph, ShortestPathResult } from "./interface";

export function dijkstra(graph: Graph, startNode: string, endNode: string): ShortestPathResult {
  const distances: { [node: string]: number } = {};
  const previous: { [node: string]: string | null } = {};
  const priorityQueue = new Set<string>();

  // Initialize distances and priority queue
  for (const node in graph) {
    if (node === startNode) {
      distances[node] = 0;
    } else {
      distances[node] = Infinity;
    }
    priorityQueue.add(node);
  }

  while (priorityQueue.size > 0) {
    // Find the node with the smallest distance
    let smallestDistance = Infinity;
    let smallestNode: string | null = null;


    for (const node of priorityQueue) {
      if (distances[node] < smallestDistance) {
        smallestDistance = distances[node];
        smallestNode = node;
      }
    }

    if (smallestNode === null || smallestNode === endNode) {
      break; // Reached the end node or no more reachable nodes
    }

    priorityQueue.delete(smallestNode);

    // Update distances to neighbors
    for (const neighbor in graph[smallestNode]) {
      const distance = distances[smallestNode] + graph[smallestNode][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
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
    return { distance: Infinity, path: [] };
  }

  console.log('path', path)

  return { distance: distances[endNode], path };
}
