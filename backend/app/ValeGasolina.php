<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ValeGasolina extends Model
{
    use SoftDeletes;
    protected $table = 'vale_gasolinas';
    protected $fillable = [
        'asignacion_vehiculo_id',
        'estacion_servicio_id',
        'numero_vale',
        'motivo_viaje',
        'litros_aprox',
        'litros',
        'importe',
    ];
    protected $dates = ['deleted_at'];
    public function vehiculo(){
        return $this->belongsTo('App\Vehiculo');
    }

}
