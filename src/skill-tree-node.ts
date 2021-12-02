import { v4 as uuidv4 } from 'uuid';

export default class SkillTreeNode {
  // public readonly fields
  readonly id: string;
  readonly name: string;
  readonly maxSkillPoints: number;

  // private get and settable fields
  private _skillPoints = 0;

  constructor(name: string, maxSkillPoints: number) {
    this.id = uuidv4();
    this.name = name;
    this.maxSkillPoints = maxSkillPoints;
  }

  // SkillPoints
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
  addSkillPoint() {
    if (this.skillPoints === this.maxSkillPoints) {
      return;
    } else {
      this.skillPoints += 1;
    }
  }
  removeSkillPoint() {
    if (this.skillPoints === 0) {
      return;
    } else {
      this.skillPoints -= 1;
    }
  }
}
