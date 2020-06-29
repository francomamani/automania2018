<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVehiculosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('tipo_vehiculo');
            $table->string('placa');
            $table->string('marca');
            $table->string('modelo');
            $table->string('color');
            $table->float('cilindrada');
            $table->integer('gestion')->unsigned();
            $table->enum('estado_vehiculo', [
                'NUEVO',
                'REGULAR',
                'MALO',
            ]);
            $table->enum('disponibilidad', [
                'ACTIVO ASIGNADO',
                'ACTIVO NO ASIGNADO',
                'INACTIVO EN REPARACIÓN',
            ])->default('ACTIVO NO ASIGNADO');
            $table->text('obsevaciones')->nullable();
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
        Schema::dropIfExists('vehiculos');
    }
}
