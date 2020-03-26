import {Component, Input} from '@angular/core';
import {InputDataModel} from '../../models/input-data.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent {

  @Input() model: InputDataModel;

  constructor(public activeModal: NgbActiveModal) {
  }

}
