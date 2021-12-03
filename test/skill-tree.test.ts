import { SkillTree } from '../src/skill-tree';
import {
  SkillTreeNode,
  AdjacencyType,
  skillFactory
} from '../src/skill-tree-node';

let tree: SkillTree;

beforeEach(() => {
  tree = new SkillTree();
});

describe('CONSTRUCTOR', () => {
  test('maxSkillPoints & skills', () => {
    tree = new SkillTree([skillFactory(), skillFactory()]);
    expect(tree.maxTotalSkillPoints).toBe(3);
    expect(tree.nodes).toHaveLength(2);
  });
  test('maxSkillPoints', () => {
    tree = new SkillTree();
    expect(tree.maxTotalSkillPoints).toBe(3);
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

describe('SKILLPOINTS', () => {
  test('get amount of skill points spent', () => {
    tree.createNode(skillFactory('', 3, 2));
    tree.createNode(skillFactory('', 3, 3));
    expect(tree.skillPointsSpent).toBe(5);
  });

  describe('set availableSkillPoints', () => {
    test('set availableSkillPoints = maxSP=3 & SPspent=0', () => {
      expect(tree.skillPointsSpent).toBe(0);
      tree.availableSkillPoints = tree.maxTotalSkillPoints;
      expect(tree.availableSkillPoints).toBe(tree.maxTotalSkillPoints);
    });
    test('set availableSkillPoints = maxSP=3 & SPspent=2', () => {
      expect(tree.skillPointsSpent).toBe(0);
      tree.createNode(skillFactory('', 3, 2));
      tree.availableSkillPoints = tree.maxTotalSkillPoints;
      expect(tree.availableSkillPoints).toBe(tree.maxTotalSkillPoints);
    });
  });
});

describe('ADJACENT', () => {
  let nodeA: SkillTreeNode;
  let nodeB: SkillTreeNode;

  beforeEach(() => {
    tree = new SkillTree();
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
