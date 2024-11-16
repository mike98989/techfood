<?php

use App\Http\Controllers\Api\GenericController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\LabInputsController;
use App\Http\Controllers\Api\WordPressAuthController;
use App\Http\Controllers\Api\FruitProductionController;
use App\Http\Controllers\Api\DeviationComplaintController;
//use App\Http\Controllers\Api\FruitProductionController;

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
    //////// API resource for Laboratory Inputs
    Route::apiResource('labinputs', LabInputsController::class);
    //////// API resource for Fruit Production
    Route::apiResource('fruitproduction', FruitProductionController::class);
    //////// API resource for deviation complaints
    Route::apiResource('deviationcomplaints', DeviationComplaintController::class); 

    //////User Signout
    Route::post('/auth/signout', [AuthController::class, 'signout'])->name('user.logout');

    /////// Get All chart data
    Route::get("get_all_chart_data",[DashboardController::class, 'processAllChartData'])->name('dashboard.get_all_chart_data');
});

Route::middleware('guest')->group(function () {

    Route::get('/translations', [GenericController::class, 'index'])->name('translations');
    Route::post('/auth/signin', [AuthController::class, 'signin'])->name('user.login');
    Route::post('/auth/signup', [UserController::class, 'store'])->name('user.store');
    Route::post('/auth/wordpress_signin', [WordPressAuthController::class, 'signin'])->name('user.wordpress_login');
    /////// Get Fruits for Fruit Production
    Route::get("fruits",[FruitProductionController::class, 'getFruits'])->name('fruit_production.get_fruits');

    /////// Get Status for Fruit Production
    Route::get("fruit_production_status",[FruitProductionController::class, 'getStatus'])->name('fruit_production_status.get_status');

    /////// Get Causes for Fruit Production
    Route::get("causes",[FruitProductionController::class, 'getCauses'])->name('fruit_causes.get_fruits');
    // /////// Get Deviation Types for fruit production
    Route::get("deviation_types",[FruitProductionController::class, 'getDeviationTypes'])->name('fruit_causes.get_deviation_types');
    // /////// Get Deviation Types for Deviation Complaint
    Route::get("deviation_types_for_deviation_complaint",[DeviationComplaintController::class, 'getDeviationTypesForDeviationComplaint'])->name('deviation_complaints.get_deviation_types_for_deviation_complaint');
    // /////// Get Deviation Codes for Deviation Complaint
    Route::get("deviation_codes_for_deviation_complaint",[DeviationComplaintController::class, 'getDeviationCodesForDeviationComplaint'])->name('deviation_complaints.get_deviation_codes_for_deviation_complaint');
    // /////// Get Hazard Types
    Route::get("hazard_type_for_deviation_complaint",[DeviationComplaintController::class, 'getHazardTypes'])->name('deviation_complaints.get_hazard_types');
    // /////// Get Risk Categories
    Route::get("risk_categories_for_deviation_complaint",[DeviationComplaintController::class, 'getRiskCategories'])->name('deviation_complaints.get_risk_categories');
    // /////// Get Product Types
    Route::get("products_type_for_deviation_complaint",[DeviationComplaintController::class, 'getProductTypes'])->name('deviation_complaints.get_product_types');

    // /////// Get Line Typs
    Route::get("line_types_for_deviation_complaint",[DeviationComplaintController::class, 'getLineTypes'])->name('deviation_complaints.get_line_types');

    // /////// Get All deviation forms related data
    Route::get("deviation_form_related_data",[DeviationComplaintController::class, 'processAllRelatedTableData'])->name('deviation_complaints.get_related_form_data');

    // /////// Get All fruit production forms related data
    Route::get("fruit_production_form_related_data",[FruitProductionController::class, 'processAllRelatedTableData'])->name('fruit_production_status.get_related_form_data');

    
    Route::get('generate', function (){
        \Illuminate\Support\Facades\Artisan::call('storage:link');
        echo 'ok';
    });

    Route::get('migrate', function (){
        \Illuminate\Support\Facades\Artisan::call('migrate');
        echo 'migrated';
    });

    Route::get('fresh-migrate-seed', function (){
        \Illuminate\Support\Facades\Artisan::call('migrate:fresh --seed');
        echo 'migrated and seeded';
    });
    
    Route::get('seed', function (){
        \Illuminate\Support\Facades\Artisan::call('db:seed');
        echo 'db seeded';
    });

    Route::get('clear', function() {

        Artisan::call('cache:clear');
        Artisan::call('config:clear');
        Artisan::call('config:cache');
        Artisan::call('view:clear');
     
        return "Cleared!";
     
     });


     Route::get('/seed', function() {

        Artisan::call('db:seed');     
        return "Seeded!";
     
     });
    
});

});
