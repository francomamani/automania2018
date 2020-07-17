<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ValeCombustible extends Model
{
    use SoftDeletes;

    protected $table = 'vale_combustibles';
    protected $fillable = [
        'kilometraje_id',
        'asignacion_vehiculo_id',
        'estacion_servicio_id',
        'numero_vale',
        'motivo_viaje',
        'litros',
        'importe',
    ];
    protected $dates = ['deleted_at'];
    protected $appends = [
        'kilometraje',
        'asignacion_vehiculo',
        'estacion_servicio',
    ];

    public function vehiculo()
    {
        return $this->belongsTo('App\Vehiculo');
    }

    public function getKilometrajeAttribute()
    {
        return Kilometraje::find($this->kilometraje_id);
    }

    public function getAsignacionVehiculoAttribute()
    {
        return AsignacionVehiculo::find($this->asignacion_vehiculo_id);
    }

    public function getEstacionServicioAttribute()
    {
        return EstacionServicio::find($this->estacion_servicio_id);
    }

}
