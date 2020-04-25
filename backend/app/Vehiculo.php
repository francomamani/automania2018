<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehiculo extends Model
{
    use SoftDeletes;
    protected $table = "vehiculos";
    protected $fillable = [
        'placa',
        'marca',
        'modelo',
        'color',
        'cilindrada',
        'gestion',
        'activo'];
    protected $dates = ['deleted_at'];
    public function kilometrajes(){
        return $this->hasMany('App\Kilometraje');
    }
    public function valeGasolinas(){
        return $this->hasMany('App\ValeGasolina');
    }
    public function tallerMecanicos(){
        return $this->hasMany('App\TallerMecanico');
    }
    public function mantenimientos(){
        return $this->hasMany('App\Mantenimiento');
    }
    public function asignacionVehiculos() {
        return $this->hasMany('App\AsignacionVehiculo');
    }

}
