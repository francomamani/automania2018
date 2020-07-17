<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateValeCombustiblesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vale_combustibles', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('kilometraje_id')->unsigned();
            $table->foreign('kilometraje_id')
                ->references('id')
                ->on('kilometrajes')
                ->onDelete('cascade');
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
            $table->integer('litros')->unsigned();
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
        Schema::dropIfExists('vale_combustibles');
    }
}
