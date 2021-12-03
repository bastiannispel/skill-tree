import { SkillTree } from '../src/skill-tree';
import { SkillTreeNode, skillFactory } from '../src/skill-tree-node';

let tree: SkillTree;
let node: SkillTreeNode;

beforeEach(() => {
  tree = new SkillTree(3);
  const skill = skillFactory('Intelligence', 3, 2);
  node = tree.createNode(skill);
});

describe('SKILLPOINTS', () => {
  describe('set skillPoints', () => {
    test('set skillPoints = maxSkillPoints', () => {
      node.skillPoints = 3;
      expect(node.skillPoints).toBe(3);
    });
    test('set skillPoints > maxSkillPoints', () => {
      node.skillPoints = node.maxSkillPoints + 2;
      expect(node.skillPoints).toBe(node.maxSkillPoints);
    });
    test('set skillPoints < 0', () => {
      node.skillPoints = -1;
      expect(node.skillPoints).toBe(0);
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
  test('set adjacent', () => {
    const node = tree.createNode({
      name: 'Strength',
      maxSkillPoints: 3,
      skillPoints: 2
    });
    node.adjacent = [node.id];
    expect(node.adjacent).toHaveLength(1);
    expect(node.adjacent).toContain(node.id);
  });
});
