import {Chofer} from './chofer';
import {Vehiculo} from './vehiculo';
import {ServicioGeneral} from './servicio-general';

export class AsignacionVehiculo {
  constructor(
    public sevicio_general_id: number,
    public chofer_id: number,
    public vehiculo_id: number,
    public responsable_actual: boolean,
    public id?: number,
    public resumen?: string,
    public chofer?: Chofer,
    public vehiculo?: Vehiculo,
    public servicio_general?: ServicioGeneral
  ) {
  }
}
