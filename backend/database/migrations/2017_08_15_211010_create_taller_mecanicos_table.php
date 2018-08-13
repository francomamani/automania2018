<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTallerMecanicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('taller_mecanicos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('identificacion');
            $table->string('nombre');
            $table->string('direccion');
            $table->string('telefono');
            $table->string('nit');
            $table->string('nombre_propietario');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('taller_mecanicos');
    }
}
