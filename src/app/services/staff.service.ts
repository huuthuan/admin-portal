﻿import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '@environments/environment';
import {User} from '@app/models';

export const STAFFS_STORAGE = 'staffs';

@Injectable()
export class StaffService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/staffs`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/staffs/${id}`);
  }

  create(user: User) {
    return this.http.post(`${environment.apiUrl}/staffs`, user);
  }

  update(user: User) {
    return this.http.put(`${environment.apiUrl}/staffs/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/staffs/${id}`);
  }
}
