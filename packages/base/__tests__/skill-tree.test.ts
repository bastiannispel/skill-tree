import { SkillTree } from '../src/skill-tree';
import {
  SkillTreeNode,
  AdjacencyType,
  skillFactory,
} from '../src/skill-tree-node';

let tree: SkillTree;

beforeEach(() => {
  tree = new SkillTree();
});

describe('CONSTRUCTOR', () => {
  test('maxSP & skills', () => {
    tree = new SkillTree([skillFactory('', 3, 0), skillFactory('', 3, 0)]);
    expect(tree.maxTotalSkillPoints).toBe(6);
    expect(tree.nodes).toHaveLength(2);
  });
  test('maxSP', () => {
    tree = new SkillTree();
    expect(tree.maxTotalSkillPoints).toBe(0);
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
    test('existing', () => {
      const node = tree.createNode(skill);
      expect(tree.getNode(node.id)).toBe(node);
    });
    test('non-existing', () => {
      expect(tree.getNode('invalidId')).toBeNull();
    });
  });

  describe('remove node', () => {
    test('existing', () => {
      const node = tree.createNode(skill);
      expect(tree.nodes).toHaveLength(1);
      expect(tree.removeNode(node.id)).toBeTruthy();
      expect(tree.nodes).toHaveLength(0);
    });
    test('non-existing', () => {
      expect(tree.removeNode('invalidId')).toBeFalsy();
      expect(tree.nodes).toHaveLength(0);
    });
  });
});

describe('SKILLPOINTS', () => {
  beforeEach(() => {
    tree.createNode(skillFactory('', 3, 2));
    tree.createNode(skillFactory('', 3, 3));
  });

  test('get amount of skill points spent', () => {
    expect(tree.skillPointsSpent).toBe(5);
  });

  describe('set availableSkillPoints', () => {
    test('= maxSP', () => {
      tree.availableSkillPoints = tree.maxTotalSkillPoints;
      expect(tree.availableSkillPoints).toBe(
        tree.maxTotalSkillPoints - tree.skillPointsSpent
      );
    });
    test('> maxSP', () => {
      tree.availableSkillPoints = tree.maxTotalSkillPoints + 5;
      expect(tree.availableSkillPoints).toBe(1);
    });
    test('< 0', () => {
      tree.availableSkillPoints = -3;
      expect(tree.availableSkillPoints).toBe(0);
    });
  });

  describe('add availableSkillPoint', () => {
    test('< maxTotalSP - SPspent', () => {
      expect(tree.addAvailableSkillPoint()).toBeTruthy();
      expect(tree.availableSkillPoints).toBe(1);
    });
    test('= maxTotalSP', () => {
      tree.availableSkillPoints = tree.maxTotalSkillPoints;
      expect(tree.addAvailableSkillPoint()).toBeFalsy();
      const maxAvailable = tree.maxTotalSkillPoints - tree.skillPointsSpent;
      expect(tree.availableSkillPoints).toBe(maxAvailable);
    });
  });

  describe('remove availableSkillPoint', () => {
    test('> 0', () => {
      tree.availableSkillPoints = 1;
      expect(tree.removeAvailableSkillPoint()).toBeTruthy();
      expect(tree.availableSkillPoints).toBe(0);
    });
    test('= 0', () => {
      tree.availableSkillPoints = 0;
      expect(tree.removeAvailableSkillPoint()).toBeFalsy();
      expect(tree.availableSkillPoints).toBe(0);
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
