import {UniversityModel} from './university-data.model';
import {SportStatModel} from './sport-stat.model';

export class InputDataModel {
  name: string;
  uni: UniversityModel;

  pushups: number;
  situps: number;
  squats: number;
  planks: number;

  constructor(name: string, uni: UniversityModel, pushups: number, situps: number, squats: number, planks: number) {
    this.name = name;
    this.uni = uni;
    this.pushups = pushups;
    this.situps = situps;
    this.squats = squats;
    this.planks = planks;
  }
}
