import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {AuthenticationService} from '@app/services';
import {User} from '@app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  loggedUser: User = new User();
  isOpenMenu = false;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      this.loggedUser = user;
    });
  }

  onToggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  onCloseMenu() {
    if (this.isOpenMenu) {
      this.isOpenMenu = false;
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
