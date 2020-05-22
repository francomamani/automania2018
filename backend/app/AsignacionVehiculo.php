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

    protected $appends = ['activo'];

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

    public function getActivoAttribute()
    {
        $activo = Chofer::find($this->chofer_id)->activo && Vehiculo::find($this->vehiculo_id)->activo;
        if ($activo) {
            AsignacionVehiculo::find($this->getKey())->restore();
            return 'si';
        } else {
            AsignacionVehiculo::destroy($this->getKey());
            return 'no';
        }
    }

}
