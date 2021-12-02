import { SkillTreeNode, AdjacencyType } from './skill-tree-node';

// type HashedTreeNodes = { [id: string]: SkillTreeNode };

export enum GraphType {
  Directed,
  Undirected
}

export class SkillTree {
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
  getNode(id: string): SkillTreeNode | null {
    const node = this._nodes.find((x) => x.id === id);
    return node ? node : null;
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

  // TODO: Implement
  // areAdjacent(idA: string, idB: string): AdjacencyType | false;

  // Adjacent
  addAdjacent(idA: string, idB: string, adjacencyType: AdjacencyType): boolean {
    const nodeA = this.getNode(idA);
    const nodeB = this.getNode(idB);

    if (nodeA === null || nodeB === null) {
      return false;
    }

    // TODO: Check if there is any adjacency between the nodes yet

    switch (adjacencyType) {
      case AdjacencyType.Unidirectional: {
        nodeA.adjacent.push(idB);
        return true;
      }
      case AdjacencyType.Bidirectional: {
        nodeA.adjacent.push(idB);
        nodeB.adjacent.push(idA);
        return true;
      }
      default:
        return false;
    }
  }
}
