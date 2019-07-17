import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {StaffDetailModel} from '../../models';
import {cloneDeep, isEqual} from 'lodash';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {
  private _staff: StaffDetailModel;
  @Input()
  get staff(): StaffDetailModel {
    return this._staff;
  }

  set staff(value: StaffDetailModel) {
    this._staff = value;
  }

  genderMale: boolean;
  genderFemale: boolean;
  editing_Staff: StaffDetailModel;
  isSubmitting: boolean = false;

  @Output() onSuccess = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.editing_Staff = cloneDeep(this.staff);
     if (this.editing_Staff.gender === 'Male') {
      this.genderMale = true;
    } else {
      if (this.editing_Staff.gender === 'Female') {
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
    return !isEqual(this.editing_Staff, this.staff);
  }
}
