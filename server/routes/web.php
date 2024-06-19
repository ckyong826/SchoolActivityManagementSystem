<?php

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});
Route::get('api/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
// Route::middleware('auth:sanctum')->get('/api/users' , [UserController::class, 'index']);
Route::get('/api/users',[UserController::class, 'index'])->middleware('auth:sanctum');
Route::post('/api/signup', [AuthController::class, "signup"]);
Route::post('/api/login', [AuthController::class, "login"]);
Route::post('/api/logout', [AuthController::class, "logout"]);
