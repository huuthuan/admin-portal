import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {confirm} from 'devextreme/ui/dialog';

import {Notify} from '@app/utils';
import {Staff} from '@app/models';
import {StaffService} from '@app/services';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss']
})
export class StaffsComponent implements OnInit {
  dataSource: Staff[] = [];
  isStaffPopup = false;
  staffPopupTitle: string;
  selectedStaff: Staff;

  constructor(private staffService: StaffService) {
  }

  ngOnInit() {
    this.loadStaffs();
  }

  private loadStaffs() {
    this.staffService.getAll().pipe(first()).subscribe((staffs) => {
      console.log(staffs);
      this.dataSource = staffs;
    });
  }

  onAddStaff() {
    this.staffPopupTitle = 'Add New Staff';
    this.selectedStaff = new Staff();
    this.isStaffPopup = true;
  }

  onEditStaffTemplate(staff) {
    this.staffPopupTitle = 'Edit Staff';
    this.selectedStaff = staff;
    this.isStaffPopup = true;
  }

  onSavedStaff() {
    this.isStaffPopup = false;
    this.loadStaffs();
  }

  onDeleteStaffTemplate(staff: Staff) {
    const message = 'Are you sure you want to delete this staff?';
    const title = 'Delete Staff';
    confirm(message, title).then((result) => {
      if (result) {
        this.staffService.delete(staff.id)
          .subscribe(() => {
            Notify.notifySuccess('Staff has been deleted successfully');
            this.loadStaffs();
          }, (error) => {
            if (error.message) {
              Notify.notifyError(error.message);
            } else {
              Notify.notifyError('An error has occurred. Please try again.');
            }
          });
      }
    });
  }

  onCancelStaff() {
    this.isStaffPopup = false;
  }
}
