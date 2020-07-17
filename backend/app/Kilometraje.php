<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kilometraje extends Model
{
    use SoftDeletes;

    protected $table = 'kilometrajes';
    protected $fillable = [
        'suministro_combustible_id',
        'anterior',
        'actual',
        'recorrido',
    ];
    protected $dates = ['deleted_at'];
    protected $appends = ['suministro_combustible'];

    public function vehiculo()
    {
        return $this->belongsTo('App\Vehiculo');
    }

    public function getSuministroCombustibleAttribute()
    {
        return SuministroCombustible::find($this->suministro_combustible_id);
    }
}
