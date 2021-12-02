import SkillTree from '../src/skill-tree';
import SkillTreeNode from '../src/skill-tree-node';

let tree: SkillTree;

beforeEach(() => {
  tree = new SkillTree([]);
});

describe('set nodes', () => {
  test('set nodes = []', () => {
    tree.nodes = [];
    expect(tree.nodes).toHaveLength(0);
  });
  test('set nodes = [x1]', () => {
    tree.nodes = [new SkillTreeNode('Strength', 2)];
    expect(tree.nodes).toHaveLength(1);
  });
});
