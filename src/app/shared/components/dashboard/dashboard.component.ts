import {Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {VirusTrackerData} from '../../models/dataset.model';
import {UniversityModel} from '../../models/university-data.model';
import {InputDataModel} from '../../models/input-data.model';
import {Observable} from 'rxjs';
import {ReducedUniWorkoutData} from '../../models/sport-stat.model';
import {SortableHeaderDirective, SortEvent} from '../../directives/sortable.directive';
import {UniversitiesService} from '../../../core/services/universities.service';
import {CoronaDataService} from '../../../core/services/corona-data.service';
import {WorkoutService} from '../../../core/services/workout.service';
import {UniworkoutService} from '../../../core/services/uniworkout.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UniworkoutService]
})
export class DashboardComponent implements OnInit {

  title = 'esn-corona-sport-challenge';

  virusTrackerData: VirusTrackerData;
  universities: UniversityModel[];

  totalPushUps: number;
  totalSitups: number;
  totalSquats: number;
  totalPlanking: number;

  submitted = false;
  model = new InputDataModel('', null, 0, 0, 0, 0);

  total$: Observable<number>;
  dataList$: Observable<ReducedUniWorkoutData[]>;

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  public uniService: UniversitiesService;
  public coronaDataService: CoronaDataService;
  public workoutService: WorkoutService;
  public uniworkoutService: UniworkoutService;

  constructor(@Inject(NgbModal) private modalService: NgbModal,
              @Inject(WorkoutService) workoutService: WorkoutService,
              @Inject(UniversitiesService) universitiesService: UniversitiesService,
              @Inject(UniworkoutService) uniworkoutService: UniworkoutService,
              @Inject(CoronaDataService) coronaDataService: CoronaDataService) {
    this.uniService = universitiesService;
    this.coronaDataService = coronaDataService;
    this.workoutService = workoutService;
    this.uniworkoutService = uniworkoutService;

    this.dataList$ = uniworkoutService.dataList$;
    this.total$ = uniworkoutService.total$;
  }

  ngOnInit(): void {
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
    this.uniworkoutService.reload();
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.uniworkoutService.sortColumn = column;
    this.uniworkoutService.sortDirection = direction;
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

}
