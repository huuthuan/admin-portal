import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../shared.module';
import {StaffsComponent} from '@app/components/md-admin';
import {AdminModuleComponent} from '@app/modules/admin/admin.component';

const COMPONENTS = [
  AdminModuleComponent,
  StaffsComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminModuleComponent,
        children: [
          {path: '', redirectTo: 'staffs', pathMatch: 'full'},
          {path: 'staffs', component: StaffsComponent}
        ]
      }
    ])
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class AdminModule {
}
