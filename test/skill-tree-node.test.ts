import { SkillTreeNode } from '../src/skill-tree-node';

let node: SkillTreeNode;

beforeEach(() => {
  node = new SkillTreeNode('Intelligence', 3);
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
    const node = new SkillTreeNode('', 2);
    node.adjacent = [node.id];
    expect(node.adjacent).toHaveLength(1);
    expect(node.adjacent).toContain(node.id);
  });
});
