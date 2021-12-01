import SkillTree from "../src/skill-tree";
import SkillTreeNode from "../src/skill-tree-node";

let tree: SkillTree;

beforeEach(() => {
  const nodes = [new SkillTreeNode("Intelligence", 3)];
  tree = new SkillTree(nodes);
});

test("create a skill tree node", () => {});
