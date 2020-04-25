<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAsignacionVehiculosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asignacion_vehiculos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('servicio_general_id')->unsigned();
            $table->foreign('servicio_general_id')
                ->references('id')
                ->on('servicio_generales')
                ->onDelete('cascade');
            $table->integer('chofer_id')->unsigned();
            $table->foreign('chofer_id')
                  ->references('id')
                  ->on('choferes')
                  ->onDelete('cascade');
            $table->integer('vehiculo_id')->unsigned();
            $table->foreign('vehiculo_id')
                ->references('id')
                ->on('vehiculos')
                ->onDelete('cascade');
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
        Schema::dropIfExists('asignacion_vehiculos');
    }
}
