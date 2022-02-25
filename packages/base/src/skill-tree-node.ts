import type { SkillTree } from './skill-tree';

export enum AdjacencyType {
  Bidirectional,
  Unidirectional,
}

export type TreeNode = {
  readonly id: string;
  readonly tree: SkillTree;
  adjacent: string[];
};

export type Skill = {
  readonly name: string;
  readonly maxSkillPoints: number;
  skillPoints: number;
};

export class SkillTreeNode implements Skill, TreeNode {
  // public readonly fields
  readonly id: string;

  readonly name: string;

  readonly maxSkillPoints: number;

  readonly tree: SkillTree;

  // public fields
  adjacent: string[];

  // skillpoints
  private skillpoints = 0;

  /**
    @returns Skill points currently set
  * */
  get skillPoints() {
    return this.skillpoints;
  }

  /**
    @param value Skill points to set
    @returns Skill points currently set
  * */
  set skillPoints(value: number) {
    const availableSP = this.tree.availableSkillPoints;
    const maxSettable = this.skillPoints + availableSP;

    const oldSP = this.skillpoints;
    if (value > this.maxSkillPoints) {
      this.skillpoints =
        maxSettable < this.maxSkillPoints ? maxSettable : this.maxSkillPoints;
    } else if (value < 0) {
      this.skillpoints = 0;
    } else {
      this.skillpoints = value > maxSettable ? maxSettable : value;
    }

    this.tree.availableSkillPoints -= this.skillpoints - oldSP;
  }

  constructor(
    id: string,
    tree: SkillTree,
    maxSkillPoints: number,
    skillPoints: number,
    name?: string,
    adjacent?: string[]
  ) {
    this.id = id;
    this.tree = tree;
    this.adjacent = adjacent || [];
    this.name = name || '';
    this.maxSkillPoints = maxSkillPoints;
    this.skillpoints = skillPoints;
  }

  /**
    @returns true if skillpoint has been added sucessfully, otherwise false
  * */
  addSkillPoint(): boolean {
    if (this.skillPoints === this.maxSkillPoints) {
      return false;
    }
    this.skillPoints += 1;
    return true;
  }

  /**
    @returns true if skillpoint has been removed sucessfully, otherwise false
  * */
  removeSkillPoint(): boolean {
    if (this.skillPoints === 0) {
      return false;
    }
    this.skillPoints -= 1;
    return true;
  }
}
