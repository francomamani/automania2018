export class EstacionServicio {
  constructor(
    public razon_social: string,
    public nit: string,
    public propietario: string,
    public activo: boolean,
    public id?: number
  ) {
  }
}
