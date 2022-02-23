import { SkillTreeNode as Node } from '@skill-tree/base';
import type { Skill, TreeNode } from '@skill-tree/base';

export default function SkillTreeNode(treeNode: TreeNode, skill: Skill) {
  const skillTreeNode = new Node(treeNode, skill);
  return skillTreeNode;
}
