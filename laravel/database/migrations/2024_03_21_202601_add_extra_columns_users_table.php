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
        Schema::table('users', function (Blueprint $table) {
            $table->string('time_zone')->default('UTC');
            $table->string('language')->default('en');
            $table->string('calendar_color_theme')->nullable();
            $table->enum('start_week_on', ['Sunday', 'Monday'])->default('Monday');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['time_zone', 'language','calendar_color_theme', 'start_week_on']);
        });
    }
};
