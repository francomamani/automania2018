<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chofer extends Model
{
    use SoftDeletes;
    protected $table = "choferes";
    protected $fillable = [
        'nombres',
        'apellidos',
        'carnet',
        'tipo',
        'activo',
        'fecha_inicio_contrato',
        'fecha_fin_contrato',
    ];
    protected $dates = ["deleted_at"];
    public function asignacionVehiculos() {
        return $this->hasMany('App\AsignacionVehiculo');
    }
}
