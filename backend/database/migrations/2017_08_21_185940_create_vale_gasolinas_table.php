<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateValeGasolinasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vale_gasolinas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('asignacion_vehiculo_id')->unsigned();
            $table->foreign('asignacion_vehiculo_id')
                  ->references('id')
                  ->on('asignacion_vehiculos')
                  ->onDelete('cascade');
            $table->integer('estacion_servicio_id')->unsigned();
            $table->foreign('estacion_servicio_id')
                  ->references('id')
                  ->on('estacion_servicios')
                  ->onDelete('cascade');
            $table->string('numero_vale');
            $table->string('motivo_viaje');
            $table->integer('litros_aprox')->unsigned()->nullable();
            $table->integer('litros')->unsigned()->nullable();
            $table->float('importe')->nullable();
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
        Schema::dropIfExists('vale_gasolinas');
    }
}
