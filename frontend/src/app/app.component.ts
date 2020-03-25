import {Component} from '@angular/core';
import {UniworkoutService} from './core/services/uniworkout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UniworkoutService]
})
export class AppComponent {

}
