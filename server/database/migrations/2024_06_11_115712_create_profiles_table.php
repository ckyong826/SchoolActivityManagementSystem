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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id('profileID');
            $table->foreignID('userID')->references('userID')->on('users');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('matrikNumber')->unique();
            $table->string('academicYear');
            $table->string('phoneNumber');
            $table->string('address');
            $table->dateTime('dateOfBirth');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
