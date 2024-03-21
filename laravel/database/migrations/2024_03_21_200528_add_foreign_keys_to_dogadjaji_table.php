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
        Schema::table('dogadjajs', function (Blueprint $table) {
            // Dodavanje spoljnih ključeva i postavljanje onDelete cascade
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('kategorija_id')->references('id')->on('kategorijas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dogadjajs', function (Blueprint $table) {
                  // Uklanjanje spoljnih ključeva
                  $table->dropForeign(['user_id']);
                  $table->dropForeign(['kategorija_id']);
        });
    }
};
