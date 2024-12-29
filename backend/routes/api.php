<?php

use App\Http\Controllers\Api\Settingscontroller;
use Illuminate\Http\Request;
use App\Models\MapDetectedBacteria;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\GenericController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\LabInputsController;
use App\Http\Controllers\Api\CCPFollowUpController;
use App\Http\Controllers\Api\DrillSampleController;
use App\Http\Controllers\Api\OEEFollowUpController;
use App\Http\Controllers\Api\HygieneRoundsController;
use App\Http\Controllers\Api\WordPressAuthController;
use App\Http\Controllers\Api\FruitProductionController;
use App\Http\Controllers\Api\DeviationComplaintController;
use App\Http\Controllers\Api\StaffingProductionController;
use App\Http\Controllers\Api\MapDetectedBacteriaController;
use App\Http\Controllers\Api\ProductivityFollowUpController;
use App\Http\Controllers\Api\SlaughterHeadMeatMidriffController;
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
    Route::get('labinputs/search', [LabInputsController::class, 'search'])->name('labinputs.search');
    Route::apiResource('labinputs', LabInputsController::class);

    //////// API resource for Fruit Production
    Route::get('fruitproduction/search', [FruitProductionController::class, 'search'])->name('fruitproduction.search');
    Route::apiResource('fruitproduction', FruitProductionController::class);

    //////// API resource for deviation complaints
    Route::get('deviationcomplaints/search', [DeviationComplaintController::class, 'search'])->name('deviationcomplaints.search');
    Route::apiResource('deviationcomplaints', DeviationComplaintController::class); 

    //////// API resource for Drill Samples
    Route::get('drillsamples/search', [DrillSampleController::class, 'search'])->name('drillsamples.search');
    Route::apiResource('drillsamples', DrillSampleController::class);
    
    //////// API resource for Head MidRiffs
    Route::get('headmidriffs/search', [SlaughterHeadMeatMidriffController::class, 'search'])->name('headmidriffs.search');
    Route::apiResource('headmidriffs', SlaughterHeadMeatMidriffController::class);
    
    //////// API resource for CCP Follow Ups
    Route::get('ccpfollowups/search', [CCPFollowUpController::class, 'search'])->name('ccpfollowups.search');
    Route::apiResource('ccpfollowups', CCPFollowUpController::class);
   
    //////// API resource for Staffing of Production
    Route::apiResource('staffingproduction', StaffingProductionController::class);
    
    //////// API resource for OEE Follow Ups
    Route::get('oeefollowups/search', [OEEFollowUpController::class, 'search'])->name('oeefollowups.search');
    Route::apiResource('oeefollowups', OEEFollowUpController::class);
    
    //////// API resource for Hygiene Rounds 
    Route::get('hygienerounds/search', [HygieneRoundsController::class, 'search'])->name('hygienerounds.search');
    Route::apiResource('hygienerounds', HygieneRoundsController::class);
    
    //////// API resource for Map Detected Bacteria
    Route::apiResource('mapdetectedbacteria', MapDetectedBacteriaController::class);
    //////// API resource for ProductivityFollowup
    Route::apiResource('productivityfollowups', ProductivityFollowUpController::class);
    
     //////// API resource for Settings
    Route::apiResource('settings', Settingscontroller::class);

    //////User Signout
    Route::post('/auth/signout', [AuthController::class, 'signout'])->name('user.logout');

    /////// Get All chart data
    Route::get("get_all_chart_data",[DashboardController::class, 'processAllChartData'])->name('dashboard.get_all_chart_data');

    /////// Get Coordinates for Map Detected Bacteria
    Route::get("map_detected_bacteria_coordinates",[MapDetectedBacteriaController::class, 'getCoordinates'])->name('map_detected_bacteria_coordinates.get_coordinates');
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

    // /////// Get All Hygiene Rounds related data
    Route::get("hygiene_round_form_related_data",[HygieneRoundsController::class, 'processAllRelatedTableData'])->name('hygiene_rounds.get_related_form_data');

    // /////// Get All fruit production forms related data
    Route::get("fruit_production_form_related_data",[FruitProductionController::class, 'processAllRelatedTableData'])->name('fruit_production_status.get_related_form_data');

    // /////// Get All Drill Samples forms related data
    Route::get("drill_sample_form_related_data",[DrillSampleController::class, 'processAllRelatedTableData'])->name('drill_samples_status.get_related_form_data');
    
    
    Route::get('generate', function (){
        if (File::exists(public_path('storage'))) {
            File::delete(public_path('storage'));
        }
        
        $output = \Illuminate\Support\Facades\Artisan::call('storage:link');
        \Log::info('Artisan storage:link output:', [$output]);  
        //symlink($_SERVER['DOCUMENT_ROOT'].'/backend/storage/app/public', $_SERVER['DOCUMENT_ROOT'].'/backend/public/storage');
        //\File::copyDirectory(storage_path('app/public'), public_path('storage'));
        //symlink('/storage/app/public', '/public/storage');
      
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
        Artisan::call('route:clear');
     
        return "Cleared!";
     
     });


     Route::get('/seed', function() {

        Artisan::call('db:seed');     
        return "Seeded!";
     
     });
    
});

});
