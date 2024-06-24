<?php

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\V1\ActivityController;

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

Route::prefix('/api/activities')->group(function () {
    Route::get('/', [ActivityController::class, 'index'])->name('activities.index');
    Route::get('/{activityID}', [ActivityController::class, 'show'])->name('activities.show');
    Route::post('/', [ActivityController::class, 'store'])->name('activities.store');
    Route::put('/{activityID}', [ActivityController::class, 'update'])->name('activities.update');
    Route::delete('/{activityID}', [ActivityController::class, 'destroy'])->name('activities.destroy');
});
