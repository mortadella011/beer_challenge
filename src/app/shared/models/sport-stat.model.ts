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
  workoutDataId: number;
  workoutId: number;
  sportId: number;
  amount: number;

  constructor(workoutDataId: number, workoutId: number, sportId: number, amount: number) {
    this.workoutDataId = workoutDataId;
    this.workoutId = workoutId;
    this.sportId = sportId;
    this.amount = amount;
  }
}
