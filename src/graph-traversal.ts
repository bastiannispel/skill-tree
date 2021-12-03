import { SkillTreeNode } from './skill-tree-node';

type HashedBooleans = { [id: string]: boolean };

export function bfsTraversalIterative(
  nodes: SkillTreeNode[],
  startNodeId: string
): string[] {
  const result: string[] = [];
  const visited: HashedBooleans = {};
  const queue: string[] = [];
  queue.push(startNodeId);

  while (queue.length > 0) {
    const nodeId = queue.shift();
    const currentNode = nodes.find((e) => e.id === nodeId);
    const currentNodeId = (currentNode as SkillTreeNode).id;
    if (!visited[currentNodeId]) {
      // Set visited true and push to results
      visited[currentNodeId] = true;
      result.push(currentNodeId);
      // Visit the neighbors of the currentNode
      currentNode?.adjacent.forEach((neighbor) => {
        if (!visited[neighbor]) queue.push(neighbor);
      });
    }
  }
  return result;
}
