<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use SoftDeletes;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'users';
    protected $fillable = [
        'cuenta', 'password', 'nombres', 'apellidos', 'carnet'
    ];
    protected $dates = ["deleted_at"];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    public function administrador(){
        return $this->hasOne('App\Administrador');
    }
    public function servicioGeneral(){
        return $this->hasOne('App\ServicioGeneral');
    }
}
