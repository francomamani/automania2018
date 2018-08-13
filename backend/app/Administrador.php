<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Administrador extends Model
{
    use SoftDeletes;
    protected $table = 'administradores';
    protected $fillable = [
        'user_id'
    ];
    protected $dates = ['deletec_at'];
    public function user(){
        return $this->belongsTo('App\User');
    }
}
