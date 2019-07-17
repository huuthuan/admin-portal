import {Component, OnInit} from '@angular/core';
import {Staff} from '@app/models';
import {StaffService} from '@app/services';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss']
})
export class StaffsComponent implements OnInit {
  dataSource: Staff[] = [];
  isStaffPopup: boolean = false;
  staffPopupTitle = 'New Insurance';
  selectedStaff: Staff;
  isOpenMenu: boolean = false;

  constructor(private staffService: StaffService) {
  }

  ngOnInit() {
    this.loadStaffs();
  }

  loadStaffs() {
    this.dataSource = this.staffService.getAll();
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

  }

  onCancelStaff() {
    this.isStaffPopup = false;
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

  }

}
