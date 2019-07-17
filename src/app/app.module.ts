import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {JwtInterceptor, ErrorInterceptor, fakeBackendProvider} from './utils';

import {AuthGuard} from '@app/guards';
import {SharedModule} from '@app/modules/shared.module';
import {AuthenticationService, UserService, AlertService} from '@app/services';
import {AppComponent} from './app.component';
import {routing} from './app.routing';

const GUARDS = [
  AuthGuard
];

const SERVICES = [
  AuthenticationService,
  UserService,
  AlertService
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    routing
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ...GUARDS,
    ...SERVICES,

    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // Provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
