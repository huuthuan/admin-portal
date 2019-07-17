import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {User} from '@app/models';

export const TOKEN_KEY = 'currentUser';
export const USERS_STORAGE = 'users';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem(TOKEN_KEY))
  );
  public currentUser: Observable<User> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  redirectToPortal(params?: object) {
    if (this.currentUserValue) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/authenticate`, {username, password})
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUserSubject.next(null);
  }
}
