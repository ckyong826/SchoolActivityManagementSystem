<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\ActivityController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/users' , [UserController::class, 'index']);
Route::post('/api/activities', [ActivityController::class, 'store']);
