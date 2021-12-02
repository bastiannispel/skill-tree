import SkillTreeNode from './skill-tree-node';

export default class SkillTree {
  // private get and settable fields
  private _nodes: SkillTreeNode[];

  constructor(nodes: SkillTreeNode[]) {
    this._nodes = nodes;
  }

  // SkillTreeNodes
  get nodes() {
    return this._nodes;
  }
  set nodes(value: SkillTreeNode[]) {
    this._nodes = value;
  }
  // addSkillPoint() {
  //   if (this.skillPoints === this.maxSkillPoints) {
  //     return;
  //   } else {
  //     this.skillPoints += 1;
  //   }
  // }
  // removeSkillPoint() {
  //   if (this.skillPoints === 0) {
  //     return;
  //   } else {
  //     this.skillPoints -= 1;
  //   }
  // }
}
