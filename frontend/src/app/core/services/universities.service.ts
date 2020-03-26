import {Inject, Injectable} from '@angular/core';
import {UniversityModel} from '../../shared/models/university-data.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversitiesService {

  private url = environment.baseUrl + '/university';
  private http: HttpClient;

  constructor(@Inject(HttpClient) http: HttpClient) {
    this.http = http;
  }

  getUnis(): Observable<UniversityModel[]> {
    return this.http.get<UniversityModel[]>(this.url);
  }
}
