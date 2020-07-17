import {User} from './user';

export class ServicioGeneral {
  constructor(
    public user_id: number,
    public id?: number,
    public user?: User
  ) {
  }
}
