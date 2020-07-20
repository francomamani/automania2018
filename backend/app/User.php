<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

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

    protected $appends = ['tipo'];


    public function getTipoAttribute()
    {
        $esServicioGeneral = ServicioGeneral::where('user_id', $this->getKey())->exists();
        if ($esServicioGeneral) {
            return 'servicio-general';
        } else {
            return 'administrador';
        }
    }

    public function administrador()
    {
        return $this->hasOne('App\Administrador');
    }

    public function servicioGeneral()
    {
        return $this->hasOne('App\ServicioGeneral');
    }
}
