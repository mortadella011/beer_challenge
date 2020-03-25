import {Inject, Injectable} from '@angular/core';
import {InputDataModel} from '../../shared/models/input-data.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {ReducedUniWorkoutData, UniWorkoutData, WorkoutData} from '../../shared/models/sport-stat.model';

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

  getAllWorkoutsPerUni(): Observable<ReducedUniWorkoutData[]> {
    return this.http.get<UniWorkoutData[]>(this.urlWorkout).pipe(
      // group by uni
      map(dataList => {
        return dataList.reduce((uniMap, data) => {
          if (!uniMap.has(data.uniId)) {
            uniMap.set(data.uniId, new Map<number, UniWorkoutData>());
          }
          uniMap.get(data.uniId).set(data.sportId, data);
          return uniMap;
        }, new Map<number, Map<number, UniWorkoutData>>());
      }),
      // calculate sums
      map(dataList => {
        const uniList = new Set<ReducedUniWorkoutData>();
        dataList.forEach((value, key) => {

          const pushUps = (value.get(1) != null && value.get(1).amount >= 0) ? value.get(1).amount : 0;
          const situps = (value.get(2) != null && value.get(2).amount >= 0) ? value.get(2).amount : 0;
          const squats = (value.get(3) != null && value.get(3).amount >= 0) ? value.get(3).amount : 0;
          const planking = (value.get(4) != null && value.get(4).amount >= 0) ? value.get(4).amount : 0;

          uniList.add({
            ranking: 0,
            uniId: key,
            uniName: value.get(1).uni,
            pushUps: pushUps,
            situps: situps,
            squats: squats,
            planking: planking,
            total: pushUps + situps + squats + planking
          });
        });
        return Array.from(uniList)
          .sort((a, b) => b.total - a.total)
          .map((data, index) => {
            data.ranking = index + 1;
            return data;
          });
      })
    );
  }

  getAllWorkoutData(): Observable<Map<number, WorkoutData>> {
    return this.http.get<WorkoutData[]>(this.urlWorkout + '/data').pipe(
      map(dataList => {
        return dataList.reduce((sportMap, data) => {
          sportMap.set(data.sportId, data);
          return sportMap;
        }, new Map<number, WorkoutData>());
      })
    );
  }

  private submitWorkoutDataIntern(workout: string, sport: number, amount: number): Observable<any> {
    const amountNorm = amount != null && amount >= 0 ? 0 : amount;
    return this.http.post(this.urlWorkout + '/data', {workout: workout, sport: sport, amount: amountNorm});
  }
}
