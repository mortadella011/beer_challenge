import {SportModel} from './sport.model';

export class SportStatModel {
  sport: SportModel;
  stat: number;

  constructor(sport: SportModel, stat: number) {
    this.sport = sport;
    this.stat = stat;
  }
}
