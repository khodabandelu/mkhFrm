export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  birthDate?: string;
  cellphone?: string;
  email?: string;
  avatarImageCode?: string;
  gender?: string;
  enabled?: boolean;
  groups?: any[];
  authorities?: any[];
}

export class User implements IUser {

  constructor(id?: number,
              firstName?: string,
              lastName?: string,
              username?: string,
              password?: string,
              birthDate?: string,
              cellphone?: string,
              email?: string,
              avatarImageCode?: string,
              gender?: string,
              enabled?: boolean,
              groups?: any[],
              authorities?: any[]) {
  }
}
