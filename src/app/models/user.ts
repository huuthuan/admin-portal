export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}

export class UserLoginInput {
  username: string;
  password: string;

  constructor(init?: Partial<UserLoginInput>) {
    Object.assign(this, init);
  }
}
