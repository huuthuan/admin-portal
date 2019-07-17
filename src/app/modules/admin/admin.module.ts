import {NgModule} from '@angular/core';

import {SharedModule} from '../shared.module';
import {StaffsComponent} from '@app/components/md-admin';

const COMPONENTS = [
  StaffsComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class AdminModule {
}
