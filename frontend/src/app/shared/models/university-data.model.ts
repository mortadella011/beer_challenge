import {SportStatModel} from './sport-stat.model';

export class UniversityDataModel {
  uni: UniversityModel;
  stat: SportStatModel[];

  constructor(uni: UniversityModel, stat: SportStatModel[]) {
    this.uni = uni;
    this.stat = stat;
  }
}

export class UniversityModel {
  uniId: number;
  name: string;

  constructor(uniId: number, name: string) {
    this.uniId = uniId;
    this.name = name;
  }
}
