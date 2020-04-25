<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EstacionServicio extends Model
{
    use SoftDeletes;
    protected $table = 'estacion_servicios';
    protected $fillable = [
        'razon_social',
        'nit',
        'propietario',
        'activo'
    ];
    protected $dates = ['deleted_at'];

    public function valeGasolinas(){
        return $this->hasMany('App\ValeGasolina');
    }
}
