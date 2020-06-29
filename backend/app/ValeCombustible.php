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
        'litros_aprox',
        'litros',
        'importe',
    ];
    protected $dates = ['deleted_at'];
    public function vehiculo(){
        return $this->belongsTo('App\Vehiculo');
    }

}
