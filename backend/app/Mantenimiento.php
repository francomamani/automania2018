<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mantenimiento extends Model
{
    use SoftDeletes;
    protected $table = 'taller_mecanicos';
    protected $fillable = [
        'asignacion_vehiculo_id',
        'taller_mecanico_id',
        'descripcion',
        'numero_factura',
        'monto',
        'fecha_inicio',
        'fecha_fin',
        'descripcion_servicio',
        'tipo',
        'anulado',
        'numero_correlativo',
    ];
    protected $dates = ['deleted_at'];
    public function chofer(){
        return $this->belongsTo('App\Chofer');
    }
    public function vehiculo(){
        return $this->belongsTo('App\Vehiculo');
    }
    public function tallerMecanico(){
        return $this->belongsTo('App\TallerMecanico');
    }
}
