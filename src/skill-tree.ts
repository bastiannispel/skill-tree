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

  areAdjacent(
    a: string | SkillTreeNode,
    b: string | SkillTreeNode
  ): AdjacencyType | false {
    const nodeA = a instanceof SkillTreeNode ? a : this.getNode(a);
    const nodeB = b instanceof SkillTreeNode ? b : this.getNode(b);

    if (nodeA === null || nodeB === null) {
      return false;
    }

    const adjacentToA = nodeB.adjacent.includes(nodeA.id);
    const adjacentToB = nodeA.adjacent.includes(nodeB.id);

    if (adjacentToA && adjacentToB) {
      return AdjacencyType.Bidirectional;
    } else if (adjacentToA || adjacentToB) {
      return AdjacencyType.Unidirectional;
    }

    return false;
  }

  // Adjacent
  addAdjacency(
    idA: string,
    idB: string,
    adjacencyType: AdjacencyType
  ): boolean {
    const nodeA = this.getNode(idA);
    const nodeB = this.getNode(idB);

    if (nodeA === null || nodeB === null) {
      return false;
    }

    // TODO: Check if there is already any adjacency between the nodes

    switch (adjacencyType) {
      case AdjacencyType.Unidirectional: {
        nodeA.adjacent.push(nodeB.id);
        return true;
      }
      case AdjacencyType.Bidirectional: {
        nodeA.adjacent.push(nodeB.id);
        nodeB.adjacent.push(nodeA.id);
        return true;
      }
    }
  }

  removeAdjacency(idA: string, idB: string): boolean {
    const nodeA = this.getNode(idA);
    const nodeB = this.getNode(idB);

    if (nodeA === null || nodeB === null) {
      return false;
    }

    const indexA = nodeA.adjacent.indexOf(nodeB.id);
    const indexB = nodeB.adjacent.indexOf(nodeA.id);

    if (indexA > -1) {
      nodeA.adjacent.splice(indexA, 1);
    }
    if (indexB > -1) {
      nodeB.adjacent.splice(indexB, 1);
    }
    return true;
  }
}
