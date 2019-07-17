import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DevExtremeModule} from 'devextreme-angular';

import {ErrorComponent} from '@app/components/error/error.component';

const BASE_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  DevExtremeModule
];

const COMPONENTS = [
  ErrorComponent
];

const DIRECTIVES = [];

const PIPES = [];

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
