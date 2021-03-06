import { SkillTreeNode, AdjacencyType } from './skill-tree-node';

export enum GraphType {
  Directed,
  Undirected,
}

export class SkillTree {
  readonly nodes: SkillTreeNode[] = [];

  private availableskillpoints = 0;

  /**
   @returns Maximum of total Skillpoints
   * */
  get maxTotalSkillPoints(): number {
    return this.nodes.reduce((a, b) => a + b.maxSkillPoints, 0);
  }

  /**
   @returns Amount of skillponts spent
   * */
  get skillPointsSpent(): number {
    return this.nodes.reduce((a, b) => a + b.skillPoints, 0);
  }

  /**
   @returns Get available skillpoints
   * */
  get availableSkillPoints(): number {
    return this.availableskillpoints;
  }

  /**
   @param value Value of available skillpoints to set    
   * */
  set availableSkillPoints(value: number) {
    const maxAvailable = this.maxTotalSkillPoints - this.skillPointsSpent;
    if (value < 0) {
      this.availableskillpoints = 0;
    } else if (value <= maxAvailable) {
      this.availableskillpoints = value;
    } else {
      this.availableskillpoints = maxAvailable;
    }
  }

  /**
   @param id ID of a skill-tree-node
   @returns SkillTreeNode | null
   * */
  getNode(id: string): SkillTreeNode | null {
    const node = this.nodes.find((x) => x.id === id);
    return node || null;
  }

  /**
   @returns Pushes the created node to the array and return it
   * */
  addNode(
    id: string,
    maxSkillPoints: number,
    skillPoints: number,
    name?: string,
    adjacent?: string[]
  ): SkillTreeNode {
    const node = new SkillTreeNode(
      id,
      this,
      maxSkillPoints,
      skillPoints,
      name,
      adjacent
    );
    this.nodes.push(node);
    return node;
  }

  /**
   @param id ID of a skill-tree-node
   @returns true if the node has been removed successfully, otherwise false
   * */
  removeNode(id: string): boolean {
    const index = this.nodes.findIndex((x) => x.id === id);
    if (index > -1) {
      this.nodes.splice(index, 1);
      return true;
    }
    return false;
  }

  /**   
   @returns true if a skillpoint can be added, otherwise false
   * */
  addAvailableSkillPoint(): boolean {
    if (
      this.availableskillpoints <
      this.maxTotalSkillPoints - this.skillPointsSpent
    ) {
      this.availableskillpoints += 1;
      return true;
    }
    return false;
  }

  /**   
   @returns true if a skillpoint can be removed, otherwise false
   * */
  removeAvailableSkillPoint(): boolean {
    if (this.availableskillpoints > 0) {
      this.availableskillpoints -= 1;
      return true;
    }
    return false;
  }

  /**   
   @param a ID or skill-tree-node instance
   @param b ID or skill-tree-node instance
   @returns Adjacency type if there is a match, otherwise false
   * */
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
    }
    if (adjacentToA || adjacentToB) {
      return AdjacencyType.Unidirectional;
    }

    return false;
  }

  /**   
   @param idA ID of a skill-tree-node instance
   @param idB ID of a skill-tree-node instance
   @param adjacencyType Type of adjaceny to add
   @returns true if the adjacency has been set up correctly, oterwise false
   * */
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
      default: {
        return false;
      }
    }
  }

  /**   
   @param idA ID of a skill-tree-node instance
   @param idB ID of a skill-tree-node instance
   @returns true if the adjacency has been removed, oterwise false
   * */
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
