<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TallerMecanico extends Model
{
    use SoftDeletes;
    protected $table = "taller_mecanicos";
    protected $fillable = [
        'identificacion',
        'nombre',
        'direccion',
        'telefono',
        'nit',
        'nombre_propietario'
    ];
    protected $dates = ['deleted_at'];
    public function mantenimientos(){
        return $this->hasMany('App\TallerMecanico');
    }
}
