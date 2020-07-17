export class Vehiculo {
  constructor(
    public tipo_vehiculo: string,
    public placa: string,
    public marca: string,
    public modelo: string,
    public color: string,
    public cilindrada: string,
    public gestion: number,
    public estado_vehiculo: 'nuevo' | 'regular' | 'malo',
    public disponibilidad: 'activo asignado' | 'activo no asignado' | 'inactivo en reparación',
    public observaciones: string,
    public id?: number
  ) {
  }
}
