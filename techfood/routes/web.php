<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// Route::get('/analyse/{path?}', function () {
//     return Inertia::render('Analyse');
// })->middleware(['auth', 'verified'])->name('analyse')->where('path','.*');

Route::get('/analyse/{parent?}/{child?}', function ($parent = null, $child = null) {
    if (!$parent) {
        // No parent, render the main pages component
        return Inertia::render('Analyse');
    } elseif ($parent && !$child) {
        // Only parent exists, render the parent component
        $component = ucfirst($parent);
    } else {
        // Both parent and child exist, render the child component within the parent
        $component = ucfirst($parent) . '/' . ucfirst($child);
    }
    return Inertia::render('Analyse'.'/'.$component);
})->middleware(['auth', 'verified'])->name('analyse');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
