import {Inject, Injectable} from '@angular/core';
import {InputDataModel} from '../../shared/models/input-data.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {WorkoutData} from '../../shared/models/sport-stat.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private urlWorkout = 'http://localhost:8080/workout';
  private http: HttpClient;

  constructor(@Inject(HttpClient) http: HttpClient) {
    this.http = http;
  }

  submitWorkout(model: InputDataModel): Observable<any> {
    return this.http.post(this.urlWorkout, {user: model.name, uni: model.uni.uniId})
      .pipe(
        map((res: any) => res.insertId),
        flatMap((insertedId: string) => this.submitWorkoutData(model, insertedId)
        ));
  }

  submitWorkoutData(model: InputDataModel, insertedId: string): Observable<any> {
    return this.submitWorkoutDataIntern(insertedId, 1, model.pushups).pipe(
      flatMap(() => this.submitWorkoutDataIntern(insertedId, 2, model.situps)),
      flatMap(() => this.submitWorkoutDataIntern(insertedId, 3, model.squats)),
      flatMap(() => this.submitWorkoutDataIntern(insertedId, 4, model.planks))
    );
  }

  private submitWorkoutDataIntern(workout: string, sport: number, amount: number): Observable<any> {
    return this.http.post(this.urlWorkout + '/data', {workout: workout, sport: sport, amount: amount});
  }

  getAllWorkouts(): Observable<Map<number, number>> {
    return this.http.get<WorkoutData[]>(this.urlWorkout).pipe(
      map(dataList => {
        console.log(dataList);
        return dataList.reduce(
          (sportMap, data) => {
            const amount = ((sportMap.has(data.sportId)) ? sportMap.get(data.sportId) : 0) + data.amount;
            sportMap.set(data.sportId, amount);
            return sportMap;
          }, new Map<number, number>()
        );
      })
    );
  }
}
