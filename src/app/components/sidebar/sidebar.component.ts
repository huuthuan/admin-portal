import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import {Subscription} from 'rxjs';

import {User} from '@app/models';
import {AuthenticationService} from '@app/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() logoTemplate: TemplateRef<any>;

  @Output() onSidebarToggle: EventEmitter<any> = new EventEmitter();

  userSubscription: Subscription;
  user: User = new User();

  navMinimized: boolean = window.innerWidth < 992;

  constructor(
    private authService: AuthenticationService) {
  }


  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  toggleMinimize() {
    this.navMinimized = !this.navMinimized;
    this.onSidebarToggle.emit();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
