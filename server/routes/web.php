<?php

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/users' , [UserController::class, 'index']);

Route::post('/api/signup', [AuthController::class, "signup"]);
Route::post('/api/login', [AuthController::class, "login"]);
Route::post('/api/logout', [AuthController::class, "logout"]);
