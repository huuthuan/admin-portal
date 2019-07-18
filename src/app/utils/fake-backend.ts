import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

import {STAFFS_STORAGE, USERS_STORAGE} from '@app/services';
import {DEFAULT_STAFFS, DEFAULT_USERS} from '@app/data';
import {User, Staff} from '@app/models';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;
    let staffs = JSON.parse(localStorage.getItem(STAFFS_STORAGE)) || DEFAULT_STAFFS;
    let users = JSON.parse(localStorage.getItem(USERS_STORAGE)) || DEFAULT_USERS;

    // Wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/auth/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/auth/register') && method === 'POST':
          return register();
        case url.endsWith('/staffs') && method === 'GET':
          return getStaffs();
        case url.endsWith('/staffs') && method === 'POST':
          return createStaff();
        case url.match(/\/staffs\/\d+$/) && method === 'GET':
          return getStaffById();
        case url.match(/\/staffs\/\d+$/) && method === 'PUT':
          return updateStaff();
        case url.match(/\/staffs\/\d+$/) && method === 'DELETE':
          return deleteStaff();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function register() {
      const user: User = body;

      if (users.find(x => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }

      if (users.find(x => x.email === user.email)) {
        return error('Email "' + user.email + '" is already taken');
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem(USERS_STORAGE, JSON.stringify(users));

      return ok();
    }

    function authenticate() {
      const {username, password} = body;
      const user = users.find(x => (x.username === username || x.email === username) && x.password === password);
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      });
    }

    function getStaffs() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(staffs);
    }

    function createStaff() {
      const staff: Staff = body;

      if (staffs.find(x => x.email === staff.email)) {
        return error('Email "' + staff.email + '" is already taken');
      }

      staff.id = staffs.length ? Math.max(...staffs.map(x => x.id)) + 1 : 1;
      staffs.push(staff);
      localStorage.setItem(STAFFS_STORAGE, JSON.stringify(staffs));

      return ok();
    }

    function updateStaff() {
      const staff: Staff = body;

      if (!isLoggedIn()) {
        return unauthorized();
      }

      if (staffs.find(x => x.email === staff.email && x.id !== staff.id)) {
        return error('Email "' + staff.email + '" is already in used');
      }

      staffs.filter(x => x.id === idFromUrl()).map((x) => {
        x.email = staff.email;
        x.first_name = staff.first_name;
        x.last_name = staff.last_name;
        x.gender = staff.gender;
        x.address = staff.address;
      });
      localStorage.setItem(STAFFS_STORAGE, JSON.stringify(staffs));
      return ok();
    }

    function getStaffById() {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      const staff = staffs.find(x => x.id === idFromUrl());
      return ok(staff);
    }

    function deleteStaff() {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      staffs = staffs.filter(x => x.id !== idFromUrl());
      localStorage.setItem(STAFFS_STORAGE, JSON.stringify(staffs));
      return ok();
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({status: 200, body}));
    }

    function unauthorized() {
      return throwError({status: 401, error: {message: 'Unauthorised'}});
    }

    function error(message) {
      return throwError({error: {message}});
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
