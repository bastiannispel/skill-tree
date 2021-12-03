import { SkillTree } from '../src/skill-tree';
import {
  SkillTreeNode,
  AdjacencyType,
  skillFactory
} from '../src/skill-tree-node';

let tree: SkillTree;

beforeEach(() => {
  tree = new SkillTree(1);
});

describe('CONSTRUCTOR', () => {
  test('maxSkillPoints skills', () => {
    const skillA = skillFactory();
    const skillB = skillFactory();
    tree = new SkillTree(3, [skillA, skillB]);
    expect(tree.maxSkillPoints).toBe(3);
    expect(tree.nodes).toHaveLength(2);
  });
  test('maxSkillPoints', () => {
    tree = new SkillTree(3);
    expect(tree.maxSkillPoints).toBe(3);
    expect(tree.nodes).toHaveLength(0);
  });
});

describe('NODES', () => {
  const skill = skillFactory();

  test('create node', () => {
    const node = tree.createNode(skill);
    expect(tree.nodes).toContain(node);
  });

  describe('get node', () => {
    test('get node [existing]', () => {
      const node = tree.createNode(skill);
      expect(tree.getNode(node.id)).toBe(node);
    });
    test('get node [non-existing ]', () => {
      expect(tree.getNode('invalidId')).toBeNull();
    });
  });

  describe('remove node', () => {
    test('remove node [existing]', () => {
      const node = tree.createNode(skill);
      expect(tree.nodes).toHaveLength(1);
      expect(tree.removeNode(node.id)).toBeTruthy();
      expect(tree.nodes).toHaveLength(0);
    });
    test('remove node [non-existing]', () => {
      expect(tree.removeNode('invalidId')).toBeFalsy();
      expect(tree.nodes).toHaveLength(0);
    });
  });
});

describe('ADJACENT', () => {
  let nodeA: SkillTreeNode;
  let nodeB: SkillTreeNode;

  beforeEach(() => {
    tree = new SkillTree(0);
    nodeA = tree.createNode(skillFactory('A', 3, 2));
    nodeB = tree.createNode(skillFactory('B', 2, 1));
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
