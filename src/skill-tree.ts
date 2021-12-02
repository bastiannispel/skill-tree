import SkillTreeNode from './skill-tree-node';

// type HashedTreeNodes = { [id: string]: SkillTreeNode };

export default class SkillTree {
  // private get and settable fields
  private _nodes: SkillTreeNode[];
  get nodes() {
    return this._nodes;
  }
  set nodes(value: SkillTreeNode[]) {
    this._nodes = value;
  }

  constructor(nodes: SkillTreeNode[]) {
    this._nodes = nodes;
  }

  // SkillTreeNode
  getNode(id: string): SkillTreeNode | false {
    const node = this._nodes.find((x) => x.id === id);
    return node ? node : false;
  }

  addNode(node: SkillTreeNode): boolean {
    if (this._nodes.find((x) => x.id === node.id)) {
      return false;
    }
    this.nodes.push(node);
    return true;
  }
  removeNode(id: string): boolean {
    const index = this._nodes.findIndex((x) => x.id === id);
    if (index > -1) {
      this._nodes.splice(index, 1);
      return true;
    }
    return false;
  }
}
