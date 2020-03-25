import {Inject, Injectable} from '@angular/core';
import {UniversityModel} from '../../shared/models/university-data.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversitiesService {

  private url = 'http://localhost:8080/university';
  private http: HttpClient;

  constructor(@Inject(HttpClient) http: HttpClient) {
    this.http = http;
  }

  getUnis(): Observable<UniversityModel[]> {
    return this.http.get<UniversityModel[]>(this.url);
  }
}
