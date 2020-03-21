import {Inject, Injectable} from '@angular/core';
import {UniversityDataModel, UniversityModel} from '../../shared/models/university-data.model';
import {SportModel} from '../../shared/models/sport.model';
import {SportStatModel} from '../../shared/models/sport-stat.model';
import {HttpClient} from '@angular/common/http';
import {VirusTrackerData} from '../../shared/models/dataset.model';
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

  getUniData(): UniversityDataModel[] {
    const pushups = new SportModel(1, 'Push-ups', '');
    const situps = new SportModel(1, 'Sit-ups', '');
    const squats = new SportModel(1, 'Squats', '');
    const planking = new SportModel(1, 'Planking', 'sec');

    const tuData1 = new SportStatModel(pushups, 30);
    const tuData2 = new SportStatModel(situps, 20);
    const tuData3 = new SportStatModel(squats, 70);
    const tuData4 = new SportStatModel(planking, 60);

    const wuData1 = new SportStatModel(pushups, 15);
    const wuData2 = new SportStatModel(situps, 10);
    const wuData3 = new SportStatModel(squats, 30);
    const wuData4 = new SportStatModel(planking, 30);

    const uniWiData1 = new SportStatModel(pushups, 150);
    const uniWiData2 = new SportStatModel(situps, 100);
    const uniWiData3 = new SportStatModel(squats, 300);
    const uniWiData4 = new SportStatModel(planking, 300);

    const bokuData1 = new SportStatModel(pushups, 1);
    const bokuData2 = new SportStatModel(situps, 2);
    const bokuData3 = new SportStatModel(squats, 5);
    const bokuData4 = new SportStatModel(planking, 3);

    const uniWien = new UniversityDataModel(new UniversityModel(1, 'Uni Wien'), [uniWiData1, uniWiData2, uniWiData3, uniWiData4]);
    const tu = new UniversityDataModel(new UniversityModel(1, 'TU'), [tuData1, tuData2, tuData3, tuData4]);
    const wu = new UniversityDataModel(new UniversityModel(1, 'WU'), [wuData1, wuData2, wuData3, wuData4]);
    const boku = new UniversityDataModel(new UniversityModel(1, 'BOKU'), [bokuData1, bokuData2, bokuData3, bokuData4]);

    return [uniWien, tu, wu, boku];
  }
}
