<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LabInputsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::middleware('guest')->group(function () {
    Route::get('/labinputs', [LabInputsController::class, 'index'])->name('labinputs.index');
});

//Route::middleware('guest')->group(function () {
    Route::post('/user_login', [AuthController::class, 'login'])->name('user.login');
//});

});
