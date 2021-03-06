<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKilometrajesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kilometrajes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('suministro_combustible_id')->unsigned();
            $table->foreign('suministro_combustible_id')
                  ->references('id')
                  ->on('suministro_combustibles')
                  ->onDelete('cascade');
            $table->integer('anterior');
            $table->integer('actual');
            $table->integer('recorrido');
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
        Schema::dropIfExists('kilometrajes');
    }
}
