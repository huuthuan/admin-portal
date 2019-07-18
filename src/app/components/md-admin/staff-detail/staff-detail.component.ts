import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {cloneDeep, isEqual} from 'lodash';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

import {Notify} from '@app/utils';
import {Staff} from '@app/models';
import {StaffService} from '@app/services';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {
  private _staff: Staff;
  @Input()
  get staff(): Staff {
    return this._staff;
  }

  set staff(value: Staff) {
    this._staff = value;
  }

  genderMale = true;
  genderFemale = false;
  editingStaff: Staff;
  isSubmitting = false;

  @Output() onSuccess = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor(private router: Router,
              private staffService: StaffService) {
  }

  ngOnInit() {
    this.editingStaff = cloneDeep(this.staff);
    if (this.editingStaff.gender === 'Male') {
      this.genderMale = true;
      this.genderFemale = false;
    } else {
      if (this.editingStaff.gender === 'Female') {
        this.genderFemale = true;
        this.genderMale = false;
      }
    }
  }

  onCancelStaff() {
    this.onCancel.emit();
  }

  genderMaleChanged() {
    if (this.genderFemale) {
      this.genderFemale = !this.genderMale;
      this.editingStaff.gender = 'Female';
    }
  }

  genderFemaleChanged() {
    if (this.genderMale) {
      this.genderMale = !this.genderFemale;
      this.editingStaff.gender = 'Male';
    }
  }

  onAddStaff() {
    this.isSubmitting = true;
    if (this.genderMale) {
      this.editingStaff.gender = 'Male';
    } else if (this.genderFemale) {
      this.editingStaff.gender = 'Female';
    }
    this.staffService.create(this.editingStaff)
      .pipe(first())
      .subscribe((data) => {
        Notify.notifySuccess('Staff has been added successfully');
        this.router.navigate(['/login']);
      }, (error) => {
        Notify.notifyError(error);
        this.isSubmitting = false;
      });
  }

  onUpdateStaff() {
    this.isSubmitting = true;
    this.staffService.update(this.editingStaff)
      .pipe(first())
      .subscribe((data) => {
        Notify.notifySuccess('Staff has been updated successfully');
        this.router.navigate(['/login']);
      }, (error) => {
        Notify.notifyError(error);
        this.isSubmitting = false;
      });
  }

  onSaveClick(e) {
    if (!e.validationGroup.validate().isValid) {
      return false;
    }

    if (this.staff.id) {
      this.onUpdateStaff();
    } else {
      this.onAddStaff();
    }
  }

  get isFormDirty() {
    return !isEqual(this.editingStaff, this.staff);
  }
}
