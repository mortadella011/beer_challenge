import {SportModel} from './sport.model';

export class SportStatModel {
  sport: SportModel;
  stat: number;

  constructor(sport: SportModel, stat: number) {
    this.sport = sport;
    this.stat = stat;
  }
}

export class WorkoutData {
  sportId: number;
  name: string;
  amount: number;

  constructor(sportId: number, name: string, amount: number) {
    this.sportId = sportId;
    this.name = name;
    this.amount = amount;
  }
}

export class UniWorkoutData {
  uni: string;
  uniId: number;
  sportId: number;
  sport: string;
  amount: number;

  constructor(uni: string, uniId: number, sportId: number, sport: string, amount: number) {
    this.uni = uni;
    this.uniId = uniId;
    this.sportId = sportId;
    this.sport = sport;
    this.amount = amount;
  }
}
