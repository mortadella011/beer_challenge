import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './shared/components/footer/footer.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SortableHeaderDirective} from './shared/directives/sortable.directive';
import {DashboardComponent} from './shared/components/dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {ImpressumComponent} from './shared/components/impressum/impressum.component';

const appRoutes: Routes = [
  {path: 'impressum', component: ImpressumComponent},
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   data: {title: 'Quarantine Sports Challenge'}
  // },
  {
    path: '',
    // redirectTo: '/dashboard',
    // pathMatch: 'full'
    component: DashboardComponent,
    data: {title: 'Quarantine Sports Challenge'}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SortableHeaderDirective,
    DashboardComponent,
    ImpressumComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
