import {Component, Inject, OnInit} from '@angular/core';
import {VirusTrackerData} from './shared/models/dataset.model';
import {UniversityDataModel, UniversityModel} from './shared/models/university-data.model';
import {UniversitiesService} from './core/services/universities.service';
import {CoronaDataService} from './core/services/corona-data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InputDataModel} from './shared/models/input-data.model';
import {WorkoutService} from './core/services/workout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'esn-corona-sport-challenge';

  universityData: UniversityDataModel[];
  virusTrackerData: VirusTrackerData;
  universities: UniversityModel[];

  uniData: Set<ReducedUniWorkoutData>;

  totalPushUps: number;
  totalSitups: number;
  totalSquats: number;
  totalPlanking: number;

  submitted = false;
  model = new InputDataModel('', null, 0, 0, 0, 0);

  private uniService: UniversitiesService;
  private coronaDataService: CoronaDataService;
  private workoutService: WorkoutService;

  constructor(@Inject(NgbModal) private modalService: NgbModal,
              @Inject(WorkoutService) workoutService: WorkoutService,
              @Inject(UniversitiesService) universitiesService: UniversitiesService,
              @Inject(CoronaDataService) coronaDataService: CoronaDataService) {
    this.uniService = universitiesService;
    this.coronaDataService = coronaDataService;
    this.workoutService = workoutService;
  }

  ngOnInit(): void {
    this.universityData = this.uniService.getUniData();
    this.coronaDataService.getCurrentCoronaDataVirusTracker().subscribe(data => this.virusTrackerData = data);
    this.reloadData();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'workout-modal-title'});
    this.uniService.getUnis().subscribe(data => this.universities = data);
  }

  submit(model: InputDataModel) {
    console.log(model);
    this.submitted = true;
    this.workoutService.submitWorkout(model).subscribe(() => {
      this.reloadData();
    });
  }

  reloadData() {
    this.loadTotalData();
    this.loadUniData();
  }

  private loadTotalData() {
    this.workoutService.getAllWorkoutData().subscribe((data) => {
      console.log(data);
      this.totalPushUps = data.has(1) ? data.get(1).amount : 0;
      this.totalSitups = data.has(2) ? data.get(2).amount : 0;
      this.totalSquats = data.has(3) ? data.get(3).amount : 0;
      this.totalPlanking = data.has(4) ? data.get(4).amount : 0;
    });
  }

  private loadUniData() {
    this.workoutService.getAllWorkoutsPerUni().subscribe((data) => {
      console.log(data);

      const uniList = new Set<ReducedUniWorkoutData>();

      data.forEach((value, key) => {
        uniList.add({
          uniId: key,
          uniName: value.get(1).uni,
          pushUps: value.get(1).amount,
          situps: value.get(2).amount,
          squats: value.get(3).amount,
          planking: value.get(4).amount,
        });
      });

      this.uniData = uniList;
    });
  }
}

export interface ReducedUniWorkoutData {
  uniId: number;
  uniName: string;
  pushUps: number;
  situps: number;
  squats: number;
  planking: number;
}
