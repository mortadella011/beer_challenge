import {Inject, Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {debounceTime, delay, map, switchMap, tap} from 'rxjs/operators';
import {ReducedUniWorkoutData} from '../../shared/models/sport-stat.model';
import {SortColumn, SortDirection} from '../../shared/directives/sortable.directive';
import {WorkoutService} from './workout.service';

interface SearchResult {
  dataList: ReducedUniWorkoutData[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compareStr = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
const compareNumb = (v1: number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(dataList: ReducedUniWorkoutData[], column: SortColumn, direction: string): ReducedUniWorkoutData[] {
  if (direction === '' || column === '') {
    return dataList;
  } else {
    return [...dataList].sort((a, b) => {
      let res;
      if (typeof a[column] === 'number') {
        res = compareNumb(<number>a[column], b[column]);
      } else {
        res = compareStr(`${a[column]}`, `${b[column]}`);
      }

      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(data: ReducedUniWorkoutData, term: string) {
  return data.uniName.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class UniworkoutService {
  private _search$ = new Subject<void>();
  private workoutService: WorkoutService;
  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(@Inject(WorkoutService) workoutService: WorkoutService) {
    this.workoutService = workoutService;

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._dataList$.next(result.dataList);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  private _loading$ = new BehaviorSubject<boolean>(true);

  get loading$() {
    return this._loading$.asObservable();
  }

  private _dataList$ = new BehaviorSubject<ReducedUniWorkoutData[]>([]);

  get dataList$() {
    return this._dataList$.asObservable();
  }

  private _total$ = new BehaviorSubject<number>(0);

  get total$() {
    return this._total$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  set page(page: number) {
    this._set({page});
  }

  get pageSize() {
    return this._state.pageSize;
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set sortColumn(sortColumn: SortColumn) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    return this.workoutService.getAllWorkoutsPerUni().pipe(
      map(list => sort(list, sortColumn, sortDirection)),
      map(list => list.filter(data => matches(data, searchTerm))),
      map(list => {
        const total = list.length;
        const dataList = list.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return {dataList, total};
      })
    );
  }
}
