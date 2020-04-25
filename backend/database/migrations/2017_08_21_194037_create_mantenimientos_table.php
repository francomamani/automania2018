<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMantenimientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mantenimientos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('asignacion_vehiculo_id')->unsigned();
            $table->foreign('asignacion_vehiculo_id')
                  ->references('id')
                  ->on('asignacion_vehiculos')
                  ->onDelete('cascade');
            $table->integer('taller_mecanico_id')->unsigned();
            $table->foreign('taller_mecanico_id')
                  ->references('id')
                  ->on('taller_mecanicos')
                  ->onDelete('cascade');
            $table->string('descripcion');
            $table->string('numero_factura')->nullable();
            $table->float('monto')->nullable();
            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_fin')->nullable();
            $table->string('descripcion_servicio')->nullable();
            $table->enum('tipo', ['preventivo', 'correctivo']);
            $table->boolean('anulado')->default(false);
            $table->string('numero_correlativo');
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
        Schema::dropIfExists('mantenimientos');
    }
}
