<?php

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/api/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/api/logout', [AuthController::class, "logout"]);
    Route::apiResource('/api/users', UserController::class);
});
// Route::middleware('auth:sanctum')->get('/api/users' , [UserController::class, 'index']);
Route::post('/api/signup', [AuthController::class, "signup"]);
Route::post('/api/login', [AuthController::class, "login"]);
