export class User {
  constructor(
    public cuenta: string,
    public nombres: string,
    public apellidos: string,
    public carnet: string,
    public id?: number
  ) {
  }
}
