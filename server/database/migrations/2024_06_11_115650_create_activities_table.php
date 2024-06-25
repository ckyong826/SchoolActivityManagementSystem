<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id('activityID');
            $table->string('activityName');
            $table->text('description');
            $table->dateTime('startDateTime');
            $table->dateTime('endDateTime');
            $table->string('venue');
            $table->string('category');
            $table->integer('maxParticipants');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
