import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../shared.module';
import {StaffsComponent} from '@app/components/md-admin';

const COMPONENTS = [
  StaffsComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', redirectTo: 'staffs', pathMatch: 'full'},
      {path: 'staffs', component: StaffsComponent}
    ])
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class AdminModule {
}
