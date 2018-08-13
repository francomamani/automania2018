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
    public function servicioGeneral(){
        return $this->belongsTo('App\ServicioGeneral');
    }
    public function chofer(){
        return $this->belongsTo('App\Chofer');
    }
    public function vehiculo(){
        return $this->belongsTo('App\Vehiculo');
    }

}
