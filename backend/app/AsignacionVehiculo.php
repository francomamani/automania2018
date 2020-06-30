<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AsignacionVehiculo extends Model
{
    use SoftDeletes;

    protected $table = 'asignacion_vehiculos';
    protected $fillable = [
        'asignacion_vehiculo_id',
        'chofer_id',
        'vehiculo_id'
    ];
    protected $dates = ['deleted_at'];
    protected $appends = ['resumen']; 

    public function servicioGeneral()
    {
        return $this->belongsTo('App\ServicioGeneral');
    }

    public function chofer()
    {
        return $this->belongsTo('App\Chofer');
    }

    public function vehiculo()
    {
        return $this->belongsTo('App\Vehiculo');
    }

    public function getChoferAttribute()
    {
        return Chofer::find($this->chofer_id);
    }

    public function getVehiculoAttribute()
    {
        return Vehiculo::find($this->vehiculo_id);
    }
    public function getResumenAttribute()
    {
        $asignacion = AsignacionVehiculo::find($this->getKey());
        $chofer = Chofer::find($asignacion['chofer_id']);
        $vehiculo = Vehiculo::find($asignacion['vehiculo_id']);
        return "{$chofer->nombres} {$chofer->apellidos} - {$vehiculo->placa}";
    }

}
