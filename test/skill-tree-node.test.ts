import SkillTreeNode from '../src/skill-tree-node';

let node: SkillTreeNode;

beforeEach(() => {
  node = new SkillTreeNode('Intelligence', 3);
});

test('create a skill tree node', () => {
  expect(node.name).toBe('Intelligence');
  expect(node.maxSkillPoints).toBe(3);
});

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
    node.addSkillPoint();
    expect(node.skillPoints).toBe(1);
  });
  test('add skillPoints = maxSkillPoints', () => {
    node.skillPoints = node.maxSkillPoints;
    node.addSkillPoint();
    expect(node.skillPoints).toBe(node.maxSkillPoints);
  });
});

describe('remove skillPoint', () => {
  test('remove skillPoints <= maxSkillPoints', () => {
    node.skillPoints = node.maxSkillPoints;
    node.removeSkillPoint();
    expect(node.skillPoints).toBe(node.maxSkillPoints - 1);
  });
  test('add skillPoints = 0', () => {
    node.skillPoints = 0;
    node.removeSkillPoint();
    expect(node.skillPoints).toBe(0);
  });
});
