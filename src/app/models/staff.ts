export class Staff {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address: string;

  constructor(init?: Partial<Staff>) {
    Object.assign(this, init);
  }
}
