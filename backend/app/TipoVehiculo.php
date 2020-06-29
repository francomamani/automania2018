<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoVehiculo extends Model
{
    use SoftDeletes;

    protected $table = 'tipo_vehiculos';
    protected $fillable = [
        'descripcion'
    ];
    protected $dates = ['deleted_at'];
}
