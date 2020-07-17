<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServicioGeneral extends Model
{
    use SoftDeletes;

    protected $table = 'servicio_generales';
    protected $fillable = [
        'user_id'
    ];
    protected $dates = ['deleted_at'];
    protected $appends = ['user'];

    public function getUserAttribute()
    {
        return User::find($this->user_id);
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function asignacionVehiculos()
    {
        return $this->hasMany('App\AsignacionVehiculo');
    }

}
