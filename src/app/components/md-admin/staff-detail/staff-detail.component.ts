import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {cloneDeep, isEqual} from 'lodash';

import {Staff} from '@app/models';

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

  genderMale: boolean;
  genderFemale: boolean;
  editingStaff: Staff;
  isSubmitting = false;

  @Output() onSuccess = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.editingStaff = cloneDeep(this.staff);
     if (this.editingStaff.gender === 'Male') {
      this.genderMale = true;
    } else {
      if (this.editingStaff.gender === 'Female') {
        this.genderFemale = true;
      }
    }
  }

  onCancelStaff() {
    this.onCancel.emit();
  }

  genderMaleChanged() {
    if (this.genderFemale) {
      this.genderFemale = !this.genderMale;
    }
  }

  genderFemaleChanged() {
    if (this.genderMale) {
      this.genderMale = !this.genderFemale;
    }
  }

  onAddStaff() {

  }

  onUpdateStaff() {

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
