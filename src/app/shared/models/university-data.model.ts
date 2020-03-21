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
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
