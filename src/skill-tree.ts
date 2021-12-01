import SkillTreeNode from "./skill-tree-node";

export default class SkillTree {
  private _nodes: SkillTreeNode[];

  constructor(nodes: SkillTreeNode[]) {
    this._nodes = nodes;
  }
}
