import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {first} from 'rxjs/operators';

import {User} from '@app/models';
import {Notify} from '@app/utils';
import {AuthenticationService} from '@app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  isSubmitting = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    // Redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  onSaveClick(e) {
    if (!e.validationGroup.validate().isValid) {
      return false;
    }

    this.isSubmitting = true;
    this.authService.register(this.user)
      .pipe(first())
      .subscribe((data) => {
        Notify.notifySuccess('Registration successful');
        this.router.navigate(['/login']);
      }, (error) => {
        Notify.notifyError(error);
        this.isSubmitting = false;
      });
  }
}
