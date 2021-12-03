import { SkillTree } from '../src/skill-tree';
import { SkillTreeNode, skillFactory } from '../src/skill-tree-node';

let tree: SkillTree;
let node: SkillTreeNode;

beforeEach(() => {
  tree = new SkillTree();
});

describe('SKILLPOINTS', () => {
  beforeEach(() => {
    node = tree.createNode(skillFactory('Int', 3, 2));
  });

  describe('set skillPoints = availableSP', () => {
    beforeEach(() => {
      tree.availableSkillPoints = node.maxSkillPoints;
    });

    test('set skillPoints = maxSP', () => {
      expect(tree.availableSkillPoints).toBe(node.maxSkillPoints);
      node.skillPoints = node.maxSkillPoints;
      expect(tree.availableSkillPoints).toBe(0);
      expect(node.skillPoints).toBe(3);
    });
    test('set skillPoints > maxSP', () => {
      expect(tree.availableSkillPoints).toBe(node.maxSkillPoints);
      node.skillPoints = node.maxSkillPoints + 2;
      expect(tree.availableSkillPoints).toBe(0);
      expect(node.skillPoints).toBe(node.maxSkillPoints);
    });
    test('set skillPoints < 0', () => {
      expect(tree.availableSkillPoints).toBe(node.maxSkillPoints);
      node.skillPoints = -1;
      expect(node.skillPoints).toBe(0);
      expect(node.skillPoints).toBe(node.maxSkillPoints);
    });
  });

  describe('add skillPoint', () => {
    test('add skillPoints < maxSkillPoints', () => {
      node.skillPoints = 0;
      expect(node.addSkillPoint()).toBeTruthy();
      expect(node.skillPoints).toBe(1);
    });
    test('add skillPoints = maxSkillPoints', () => {
      node.skillPoints = node.maxSkillPoints;
      expect(node.addSkillPoint()).toBeFalsy();
      expect(node.skillPoints).toBe(node.maxSkillPoints);
    });
  });

  describe('remove skillPoint', () => {
    test('remove skillPoints <= maxSkillPoints', () => {
      node.skillPoints = node.maxSkillPoints;
      expect(node.removeSkillPoint()).toBeTruthy();
      expect(node.skillPoints).toBe(node.maxSkillPoints - 1);
    });
    test('add skillPoints = 0', () => {
      node.skillPoints = 0;
      expect(node.removeSkillPoint()).toBeFalsy();
      expect(node.skillPoints).toBe(0);
    });
  });
});

describe('ADJACENT', () => {
  let nodeA: SkillTreeNode;
  let nodeB: SkillTreeNode;

  beforeEach(() => {
    nodeA = tree.createNode(skillFactory());
    nodeB = tree.createNode(skillFactory());
  });

  test('set adjacent', () => {
    nodeA.adjacent = [nodeB.id];
    expect(nodeA.adjacent).toHaveLength(1);
    expect(nodeA.adjacent).toContain(nodeB.id);
  });
});
