export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}

export class UserLoginInput {
  username: string;
  password: string;

  public constructor(init?: Partial<UserLoginInput>) {
    Object.assign(this, init);
  }
}
