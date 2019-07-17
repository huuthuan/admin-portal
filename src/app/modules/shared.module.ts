import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DevExtremeModule} from 'devextreme-angular';

import {JoinPipe} from '@app/pipies';
import {ErrorComponent} from '@app/components/error/error.component';
import {HeaderComponent} from '@app/components/header/header.component';
import {SidebarComponent} from '@app/components/sidebar/sidebar.component';
import {LayoutComponent} from '@app/components/layout/layout.component';

const BASE_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  DevExtremeModule
];

const COMPONENTS = [
  ErrorComponent,
  LayoutComponent,
  HeaderComponent,
  SidebarComponent
];

const DIRECTIVES = [];

const PIPES = [
  JoinPipe
];

const THEME_PROVIDERS = [];

@NgModule({
  imports: [
    ...BASE_MODULES,
  ],
  exports: [...BASE_MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [...THEME_PROVIDERS],
    };
  }
}
