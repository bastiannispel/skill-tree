import { v4 as uuidv4 } from 'uuid';

export enum AdjacencyType {
  Bidirectional,
  Unidirectional
}

export class SkillTreeNode {
  // public readonly fields
  readonly id: string;
  readonly name: string;
  readonly maxSkillPoints: number;

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

  // adjacent
  private _adjacent: string[] = [];
  get adjacent() {
    return this._adjacent;
  }
  set adjacent(value: string[]) {
    this._adjacent = value;
  }

  constructor(name: string, maxSkillPoints: number) {
    this.id = uuidv4();
    this.name = name;
    this.maxSkillPoints = maxSkillPoints;
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
