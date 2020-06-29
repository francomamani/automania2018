<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehiculo extends Model
{
    use SoftDeletes;

    protected $table = "vehiculos";
    protected $fillable = [
        'tipo_vehiculo',
        'placa',
        'marca',
        'modelo',
        'color',
        'cilindrada',
        'gestion',
        'estado_vehiculo',
        'observaciones',
        'disponibilidad',
    ];
    protected $dates = ['deleted_at'];
    protected $appends = ['resumen'];


    public function tallerMecanicos()
    {
        return $this->hasMany('App\TallerMecanico');
    }

    public function mantenimientos()
    {
        return $this->hasMany('App\Mantenimiento');
    }

    public function asignacionVehiculos()
    {
        return $this->hasMany('App\AsignacionVehiculo');
    }

    public function getResumenAttribute()
    {
        $vehiculo = Vehiculo::find($this->getKey());
        return "{$vehiculo->placa} {$vehiculo->marca} {$vehiculo->modelo}";
    }
}
