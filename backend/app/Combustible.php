<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Combustible extends Model
{
    use SoftDeletes;

    protected $table = 'combustibles';
    protected $fillable = [
        'nombre',
        'importe',
    ];
    protected $dates = ['deleted_at'];
}
