<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\RegistrationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\V1\ActivityController;
use App\Http\Controllers\Api\V1\ProfileController;

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
Route::get('/api/registration/{userID}', [RegistrationController::class, 'userRegistrations']);

Route::prefix('/api/registrations')->group(function () {
    Route::get('/', [RegistrationController::class, 'index'])->name('registrations.index');
    Route::post('/', [RegistrationController::class, 'store'])->name('registrations.store');
    Route::get('/{registration}', [RegistrationController::class, 'show'])->name('registrations.show');
    //const registrationsResponse = await axiosClient.get(`/registration?userID=${user.userID}`);
    Route::get('/{userID}', [RegistrationController::class, 'getRegistrationsByUserId'])->name('registrations.getRegistrationsByUserId');
    Route::put('/{registration}', [RegistrationController::class, 'update'])->name('registrations.update');
    Route::delete('/{registration}', [RegistrationController::class, 'destroy'])->name('registrations.destroy');
});

Route::post('/api/signup', [AuthController::class, "signup"]);
Route::post('/api/login', [AuthController::class, "login"]);

Route::prefix('/api/profile')->group(function () {
    Route::get('/{userID}', [ProfileController::class, 'showByUserID'])->name('profiles.show');
    Route::get('/edit/{userID}', [ProfileController::class, 'edit'])->name('profiles.edit');
    Route::post('/', [ProfileController::class, 'store'])->name('profiles.store');
    Route::put('/update/{userID}', [ProfileController::class, 'update'])->name('profiles.update');
    Route::delete('/{userID}', [ProfileController::class, 'destroy'])->name('profiles.destroy');
});

Route::prefix('/api/activities')->group(function () {
    Route::get('/', [ActivityController::class, 'index'])->name('activities.index');
    Route::get('/{activityID}', [ActivityController::class, 'show'])->name('activities.show');
    Route::post('/', [ActivityController::class, 'store'])->name('activities.store');
    Route::put('/{activityID}', [ActivityController::class, 'update'])->name('activities.update');
    Route::delete('/{activityID}', [ActivityController::class, 'destroy'])->name('activities.destroy');
});
