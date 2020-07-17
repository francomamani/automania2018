import {Kilometraje} from './kilometraje';
import {AsignacionVehiculo} from './asignacion-vehiculo';
import {EstacionServicio} from './estacion-servicio';

export class ValeCombustible {
  constructor(
    public kilometraje_id: number,
    public asignacion_vehiculo_id: number,
    public estacion_servicio_id: number,
    public numero_vale: string,
    public motivo_viaje: string,
    public litros: number,
    public importe: number,
    public id?: number,
    public created_at?: string,
    public kilometraje?: Kilometraje,
    public asignacion_vehiculo?: AsignacionVehiculo,
    public estacion_servicio?: EstacionServicio
  ) {
  }
}
