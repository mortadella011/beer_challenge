import {Inject, Injectable} from '@angular/core';
import {DatasetModel, VirusTrackerData} from '../../shared/models/dataset.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoronaDataService {

  private futurenovationUrl = 'https://coronavirus.futurenovation.com/';
  private thevirustrackerUrl = 'https://thevirustracker.com/free-api?countryTotal=AT';
  private http: HttpClient;

  constructor(@Inject(HttpClient) http: HttpClient) {
    this.http = http;
  }

  getCurrentCoronaData(): DatasetModel {
    this.http.get<DatasetModel>(this.futurenovationUrl);

    return new DatasetModel(
      3244,
      150,
      8,
      1,
      0,
      0,
      0,
      0,
      9,
      0,
      'https://coronavirus.futurenovation.com/'
    );
  }

  getCurrentCoronaDataVirusTracker(): Observable<VirusTrackerData> {
    return this.http.get<VirusTrackerData>(this.thevirustrackerUrl);
  }
}
