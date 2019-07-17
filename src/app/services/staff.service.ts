import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '@environments/environment';
import {Staff} from '@app/models';

export const STAFFS_STORAGE = 'staffs';

@Injectable()
export class StaffService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Staff[]>(`${environment.apiUrl}/staffs`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/staffs/${id}`);
  }

  create(staff: Staff) {
    return this.http.post(`${environment.apiUrl}/staffs`, staff);
  }

  update(staff: Staff) {
    return this.http.put(`${environment.apiUrl}/staffs/${staff.id}`, staff);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/staffs/${id}`);
  }
}
