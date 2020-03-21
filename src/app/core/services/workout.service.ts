import {Inject, Injectable} from '@angular/core';
import {InputDataModel} from '../../shared/models/input-data.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private url = 'http://localhost:8080/workout';
  private http: HttpClient;

  constructor(@Inject(HttpClient) http: HttpClient) {
    this.http = http;
  }

  submitWorkout(model: InputDataModel): Observable<any> {
    return this.http.post(this.url, {user: model.name, uni: model.uni.id});
  }
}
