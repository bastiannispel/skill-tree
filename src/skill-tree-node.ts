import { SkillTree } from './skill-tree';
import { v4 as uuidv4 } from 'uuid';

export enum AdjacencyType {
  Bidirectional,
  Unidirectional
}

export interface TreeNode {
  readonly id: string;
  readonly skillTree: SkillTree;
  adjacent: string[];
}

export interface Skill {
  readonly name: string;
  readonly maxSkillPoints: number;
  skillPoints: number;
}

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
  readonly skillTree: SkillTree;

  // public fields
  adjacent: string[];

  // skillpoints
  private _skillPoints = 0;
  get skillPoints() {
    return this._skillPoints;
  }
  set skillPoints(value: number) {
    if (value > this.maxSkillPoints) {
      this._skillPoints = this.maxSkillPoints;
    } else if (value < 0) {
      this._skillPoints = 0;
    } else {
      this._skillPoints = value;
    }
  }

  constructor(skillTree: SkillTree, skill: Skill) {
    this.id = uuidv4();
    this.skillTree = skillTree;
    this.name = skill.name;
    this.maxSkillPoints = skill.maxSkillPoints;
    this.skillPoints = skill.skillPoints;
    this.adjacent = [];
  }

  addSkillPoint(): boolean {
    if (this.skillPoints === this.maxSkillPoints) {
      return false;
    } else {
      this.skillPoints += 1;
      return true;
    }
  }
  removeSkillPoint(): boolean {
    if (this.skillPoints === 0) {
      return false;
    } else {
      this.skillPoints -= 1;
      return true;
    }
  }
}
