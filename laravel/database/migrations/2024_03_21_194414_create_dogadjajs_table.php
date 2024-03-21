<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dogadjajs', function (Blueprint $table) {
            $table->id();
            $table->date('datum');
            $table->time('vreme_od');
            $table->time('vreme_do');
            $table->string('naziv');
            $table->text('opis');
            $table->text('detalji');
            $table->string('status');  //['zavrseno', 'odlozeno', 'otkazano', 'u_toku', 'zakazano']
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('kategorija_id');
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
        Schema::dropIfExists('dogadjajs');
    }
};
