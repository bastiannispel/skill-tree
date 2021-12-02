import SkillTree from '../src/skill-tree';
import SkillTreeNode from '../src/skill-tree-node';

let tree: SkillTree;

beforeEach(() => {
  tree = new SkillTree([]);
});

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
  test('get top level node', () => {
    const node = new SkillTreeNode('', 0);
    expect(tree.addNode(node)).toBeTruthy();
    expect(tree.getNode(node.id)).toBe(node);
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
