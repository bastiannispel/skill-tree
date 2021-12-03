import { SkillTreeNode, Skill, AdjacencyType } from './skill-tree-node';

export enum GraphType {
  Directed,
  Undirected
}

export class SkillTree {
  readonly nodes: SkillTreeNode[] = [];

  // Max Global Skillpoints
  get maxTotalSkillPoints() {
    return this.nodes.reduce((a, b) => a + b.maxSkillPoints, 0);
  }

  // Max Global Skillpoints
  get skillPointsSpent() {
    return this.nodes.reduce((a, b) => a + b.skillPoints, 0);
  }

  // Available Skill Points
  private _availableSkillPoints = 0;
  get availableSkillPoints() {
    return this._availableSkillPoints;
  }
  set availableSkillPoints(value: number) {
    const maxSettable = this.maxTotalSkillPoints - this.skillPointsSpent;
    if (value < maxSettable) {
      this._availableSkillPoints = value;
    } else {
      this._availableSkillPoints = maxSettable;
    }
  }

  // Constructor
  constructor(skills?: Skill[]) {
    if (skills) {
      this.nodes = skills.map((skill) => new SkillTreeNode(this, skill));
    }
  }

  // SkillTreeNode Methods
  getNode(id: string): SkillTreeNode | null {
    const node = this.nodes.find((x) => x.id === id);
    return node ? node : null;
  }
  createNode(skill: Skill): SkillTreeNode {
    const node = new SkillTreeNode(this, skill);
    this.nodes.push(node);
    return node;
  }
  removeNode(id: string): boolean {
    const index = this.nodes.findIndex((x) => x.id === id);
    if (index > -1) {
      this.nodes.splice(index, 1);
      return true;
    }
    return false;
  }

  addAvailableSkillPoint(): boolean {
    if (
      this._availableSkillPoints <
      this.maxTotalSkillPoints - this.skillPointsSpent
    ) {
      this._availableSkillPoints += 1;
      return true;
    }
    return false;
  }
  removeAvailableSkillPoint(): boolean {
    if (this._availableSkillPoints > 0) {
      this._availableSkillPoints -= 1;
      return true;
    }
    return false;
  }

  // Ajacency Methods
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
