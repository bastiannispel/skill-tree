import { SkillTree } from '../src/skill-tree';
import { SkillTreeNode, AdjacencyType } from '../src/skill-tree-node';

let tree: SkillTree;

beforeEach(() => {
  tree = new SkillTree([], 1);
});

describe('NODES', () => {
  test('set nodes', () => {
    tree.nodes = [new SkillTreeNode('', 2)];
    expect(tree.nodes).toHaveLength(1);
  });

  describe('add node', () => {
    test('add node [new]', () => {
      const node = new SkillTreeNode('', 0);
      expect(tree.addNode(node)).toBeTruthy();
      expect(tree.nodes).toHaveLength(1);
    });
    test('add node [existing]', () => {
      const node = new SkillTreeNode('', 0);
      expect(tree.addNode(node)).toBeTruthy();
      expect(tree.addNode(node)).toBeFalsy();
      expect(tree.nodes).toHaveLength(1);
    });
  });

  describe('get node', () => {
    test('get node [existing]', () => {
      const node = new SkillTreeNode('', 0);
      expect(tree.addNode(node)).not.toBeNull();
      expect(tree.getNode(node.id)).toBe(node);
    });
    test('get node [non-existing ]', () => {
      const node = new SkillTreeNode('', 0);
      expect(tree.getNode(node.id)).toBeNull();
    });
  });

  describe('remove node', () => {
    test('remove node [existing]', () => {
      const node = new SkillTreeNode('', 0);
      expect(tree.addNode(node)).toBeTruthy();
      expect(tree.removeNode(node.id)).toBeTruthy();
      expect(tree.nodes).toHaveLength(0);
    });
    test('remove node [non-existing]', () => {
      const node = new SkillTreeNode('', 0);
      expect(tree.removeNode(node.id)).toBeFalsy();
      expect(tree.nodes).toHaveLength(0);
    });
  });
});

describe('ADJACENT', () => {
  let nodeA: SkillTreeNode;
  let nodeB: SkillTreeNode;

  beforeEach(() => {
    nodeA = new SkillTreeNode('A', 2);
    nodeB = new SkillTreeNode('B', 3);
    tree = new SkillTree([nodeA, nodeB]);
  });

  describe('are adjacent', () => {
    test('are not adjacent [node, node]', () => {
      expect(tree.areAdjacent(nodeA, nodeB)).toBeFalsy();
    });
    test('are not adjacent [node, invalidString]', () => {
      expect(tree.areAdjacent(nodeA, '')).toBeFalsy();
    });
    test('are adjacent [unidirectional]', () => {
      const adjacencyType = AdjacencyType.Unidirectional;
      expect(tree.addAdjacency(nodeA.id, nodeB.id, adjacencyType)).toBeTruthy();
      expect(tree.areAdjacent(nodeA, nodeB.id)).toBe(adjacencyType);
    });
    test('are adjacent [bidirectional]', () => {
      const adjacencyType = AdjacencyType.Bidirectional;
      expect(tree.addAdjacency(nodeA.id, nodeB.id, adjacencyType)).toBeTruthy();
      expect(tree.areAdjacent(nodeA.id, nodeB)).toBe(adjacencyType);
    });
  });

  describe('add adjacency', () => {
    test('add adjacency [invalidID]', () => {
      const adjacencyType = AdjacencyType.Bidirectional;
      expect(tree.addAdjacency('', nodeB.id, adjacencyType)).toBeFalsy();
      expect(tree.areAdjacent(nodeA.id, nodeB.id)).toBeFalsy();
    });
    test('add adjacency [unidirectional]', () => {
      const adjacencyType = AdjacencyType.Unidirectional;
      expect(tree.addAdjacency(nodeA.id, nodeB.id, adjacencyType)).toBeTruthy();
      expect(tree.areAdjacent(nodeA.id, nodeB.id)).toBe(adjacencyType);
    });
    test('add adjacency [bidirectional]', () => {
      const adjacencyType = AdjacencyType.Bidirectional;
      expect(tree.addAdjacency(nodeA.id, nodeB.id, adjacencyType)).toBeTruthy();
      expect(tree.areAdjacent(nodeA.id, nodeB.id)).toBe(adjacencyType);
    });
  });

  describe('remove adjacency', () => {
    test('remove adjacency [invalidID]', () => {
      expect(tree.removeAdjacency('', nodeB.id)).toBeFalsy();
    });
    test('remove adjacency [unidirectional]', () => {
      const adjacencyType = AdjacencyType.Unidirectional;
      expect(tree.addAdjacency(nodeA.id, nodeB.id, adjacencyType)).toBeTruthy();
      expect(tree.areAdjacent(nodeA.id, nodeB.id)).toBe(adjacencyType);
      expect(tree.removeAdjacency(nodeA.id, nodeB.id)).toBeTruthy();
      expect(tree.areAdjacent(nodeA.id, nodeB.id)).toBeFalsy();
    });
    test('remove adjacency [bidirectional]', () => {
      const adjacencyType = AdjacencyType.Bidirectional;
      expect(tree.addAdjacency(nodeA.id, nodeB.id, adjacencyType)).toBeTruthy();
      expect(tree.areAdjacent(nodeA.id, nodeB.id)).toBe(adjacencyType);
      expect(tree.removeAdjacency(nodeA.id, nodeB.id)).toBeTruthy();
      expect(tree.areAdjacent(nodeA.id, nodeB.id)).toBeFalsy();
    });
  });
});
