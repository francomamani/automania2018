<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contrato extends Model
{
    use SoftDeletes;

    protected $table = 'contratos';
    protected $fillable = [
        'chofer_id',
        'numero_contrato',
        'fecha_inicio_contrato',
        'fecha_fin_contrato',
        'activo',
    ];
    protected $dates = ['deleted_at'];
}
