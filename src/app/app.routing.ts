import {Routes, ExtraOptions, RouterModule} from '@angular/router';

import {AuthGuard} from '@app/guards';
import {ErrorComponent} from '@app/components/error/error.component';

const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  // Otherwise redirect to the error page
  {path: '**', component: ErrorComponent}
];

const config: ExtraOptions = {
  useHash: false,
};

export const routing = RouterModule.forRoot(appRoutes, config);
