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
    this.workoutService.submitWorkout(model).subscribe((res) => {
      console.log(res);
      this.reloadData();
    });
  }

  reloadData() {
    this.workoutService.getAllWorkouts().subscribe((data) => {
      console.log(data);
      this.totalPushUps = data.has(1) ? data.get(1) : 0;
      this.totalSitups = data.has(2) ? data.get(2) : 0;
      this.totalSquats = data.has(3) ? data.get(3) : 0;
      this.totalPlanking = data.has(4) ? data.get(4) : 0;
    });
  }
}
