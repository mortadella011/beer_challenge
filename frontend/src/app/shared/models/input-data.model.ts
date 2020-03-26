import {UniversityModel} from './university-data.model';

export class InputDataModel {

  constructor(public name: string,
              public uni: UniversityModel,
              public pushups: number,
              public situps: number,
              public squats: number,
              public planks: number) {
  }
}
