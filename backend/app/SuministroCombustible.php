<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SuministroCombustible extends Model
{
    use SoftDeletes;

    protected $table = 'suministro_combustibles';
    protected $fillable = [
        'vehiculo_id',
        'combustible'
    ];
    protected $dates = ['deleted_at'];
    protected $appends = ['vehiculo'];

    public function getVehiculoAttribute()
    {
        return Vehiculo::find($this->vehiculo_id);
    }

}
