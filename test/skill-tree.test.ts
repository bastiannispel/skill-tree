import { SkillTree } from '../src/skill-tree';
import { SkillTreeNode, AdjacencyType } from '../src/skill-tree-node';

let tree: SkillTree;

beforeEach(() => {
  tree = new SkillTree([]);
});

describe('NODES', () => {
  test('set nodes', () => {
    tree.nodes = [new SkillTreeNode('', 2)];
    expect(tree.nodes).toHaveLength(1);
  });

  describe('add node', () => {
    test('add new node', () => {
      const node = new SkillTreeNode('', 0);
      expect(tree.addNode(node)).toBeTruthy();
      expect(tree.nodes).toHaveLength(1);
    });
    test('add existing node', () => {
      const node = new SkillTreeNode('', 0);
      expect(tree.addNode(node)).toBeTruthy();
      expect(tree.addNode(node)).toBeFalsy();
      expect(tree.nodes).toHaveLength(1);
    });
  });

  describe('get node', () => {
    test('get existing node', () => {
      const node = new SkillTreeNode('', 0);
      expect(tree.addNode(node)).not.toBeNull();
      expect(tree.getNode(node.id)).toBe(node);
    });
    test('get non-existing node', () => {
      const node = new SkillTreeNode('', 0);
      expect(tree.getNode(node.id)).toBeNull();
    });
  });

  describe('remove node', () => {
    test('remove existing node', () => {
      const node = new SkillTreeNode('', 0);
      expect(tree.addNode(node)).toBeTruthy();
      expect(tree.removeNode(node.id)).toBeTruthy();
      expect(tree.nodes).toHaveLength(0);
    });
    test('remove non-existing node', () => {
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
    test('are not adjacent [node, ""]', () => {
      expect(tree.areAdjacent(nodeA, '')).toBeFalsy();
    });

    describe('unidirectional adjacent', () => {
      const adjacencyType = AdjacencyType.Unidirectional;

      beforeEach(() => {
        tree.addAdjacency(nodeA, nodeB, adjacencyType);
      });

      test('are unidirectional adjacent [node, node]', () => {
        expect(tree.areAdjacent(nodeA, nodeB)).toBe(adjacencyType);
      });
      test('are unidirectional adjacent [string, string]', () => {
        expect(tree.areAdjacent(nodeA.id, nodeB.id)).toBe(adjacencyType);
      });
      test('are unidirectional adjacent [node, string]', () => {
        expect(tree.areAdjacent(nodeA, nodeB.id)).toBe(adjacencyType);
      });
    });

    describe('bidirectional adjacent', () => {
      const adjacencyType = AdjacencyType.Bidirectional;

      beforeEach(() => {
        tree.addAdjacency(nodeA, nodeB, adjacencyType);
      });

      test('are unidirectional adjacent [node, node]', () => {
        expect(tree.areAdjacent(nodeA, nodeB)).toBe(adjacencyType);
      });
      test('are unidirectional adjacent [string, string]', () => {
        expect(tree.areAdjacent(nodeA.id, nodeB.id)).toBe(adjacencyType);
      });
      test('are unidirectional adjacent [node, string]', () => {
        expect(tree.areAdjacent(nodeA, nodeB.id)).toBe(adjacencyType);
      });
    });
  });

  describe('add adjacent', () => {
    test('add unidirectional adjacency', () => {
      const adjacencyType = AdjacencyType.Unidirectional;
      expect(tree.addAdjacency(nodeA.id, nodeB.id, adjacencyType)).toBeTruthy();
      expect(tree.getNode(nodeA.id)?.adjacent).toContain(nodeB.id);
      expect(tree.getNode(nodeB.id)?.adjacent).not.toContain(nodeA.id);
    });
    test('add bidirectional adjacency', () => {
      const adjacencyType = AdjacencyType.Bidirectional;
      expect(tree.addAdjacency(nodeA.id, nodeB.id, adjacencyType)).toBeTruthy();
      expect(tree.getNode(nodeA.id)?.adjacent).toContain(nodeB.id);
      expect(tree.getNode(nodeB.id)?.adjacent).toContain(nodeA.id);
    });
    test('add bidirectional adjacency with invalid id', () => {
      const adjacencyType = AdjacencyType.Bidirectional;
      expect(tree.addAdjacency('', nodeB.id, adjacencyType)).toBeFalsy();
      expect(tree.getNode(nodeA.id)?.adjacent).not.toContain(nodeB.id);
      expect(tree.getNode(nodeB.id)?.adjacent).not.toContain(nodeA.id);
    });
  });
});
