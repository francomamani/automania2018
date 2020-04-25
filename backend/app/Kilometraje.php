<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kilometraje extends Model
{
    use SoftDeletes;
    protected $table = 'kilometrajes';
    protected $fillable = [
        'vehiculo_id',
        'anterior',
        'actual',
        'recorrido',
    ];
    public function vehiculo(){
        return $this->belongsTo('App\Vehiculo');
    }
}
