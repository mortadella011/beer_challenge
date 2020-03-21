import {Component, Inject, OnInit} from '@angular/core';
import {DatasetModel, VirusTrackerData} from '../../models/dataset.model';
import {CoronaDataService} from '../../../core/services/corona-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private coronaDataService: CoronaDataService;

  dataset: VirusTrackerData;

  constructor(@Inject(CoronaDataService) coronaDataService: CoronaDataService) {
    this.coronaDataService = coronaDataService;
  }

  ngOnInit() {
    this.coronaDataService.getCurrentCoronaDataVirusTracker().subscribe(data => this.dataset = data);
  }

}
