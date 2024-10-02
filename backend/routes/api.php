<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\LabInputsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function (): void {
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('labinputs', LabInputsController::class);
});

Route::middleware('guest')->group(function () {
    Route::post('/user_login', [AuthController::class, 'login'])->name('user.login');
    Route::post('/user_registration', [UserController::class, 'store'])->name('user.store');
});

});
