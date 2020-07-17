import {SuministroCombustible} from './suministro-combustible';

export class Kilometraje {
  constructor(
    public suministro_combustible_id: number,
    public anterior: number,
    public actual: number,
    public recorrido: number,
    public id?: number,
    public suministro_combustible?: SuministroCombustible
  ) {
  }
}
