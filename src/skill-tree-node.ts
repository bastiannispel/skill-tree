import { v4 as uuidv4 } from 'uuid';
import type { SkillTree } from './skill-tree';

export enum AdjacencyType {
  Bidirectional,
  Unidirectional
}

export interface TreeNode {
  readonly id: string;
  readonly tree: SkillTree;
  adjacent: string[];
}

export interface Skill {
  readonly name: string;
  readonly maxSkillPoints: number;
  skillPoints: number;
}

/**
 @param name ID or skill-tree-node instance
 @param maxSkillPoints ID or skill-tree-node instance
 @param skillPoints ID or skill-tree-node instance
 @returns Skill data
* */
export function skillFactory(
  name?: string,
  maxSkillPoints?: number,
  skillPoints?: number
): Skill {
  return {
    name: name || '',
    maxSkillPoints: maxSkillPoints || 3,
    skillPoints: skillPoints || 0
  };
}

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

  /**
    @param skillTree Skill tree instance
    @param skill Skill data
  * */
  constructor(skillTree: SkillTree, skill: Skill) {
    this.id = uuidv4();
    this.tree = skillTree;
    this.name = skill.name;
    this.maxSkillPoints = skill.maxSkillPoints;
    this.skillpoints = skill.skillPoints;
    this.adjacent = [];
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
