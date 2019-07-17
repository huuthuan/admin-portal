import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '@app/modules/shared.module';
import {LoginComponent, RegisterComponent} from '@app/components/md-auth';

const COMPONENTS = [
  LoginComponent,
  RegisterComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ])
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class AuthModule {
}
