import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from './services';
import {User} from './models';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
    this.authenticationService.redirectToPortal();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
