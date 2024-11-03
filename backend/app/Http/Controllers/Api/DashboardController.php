<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\LabInputsController;
use App\Http\Controllers\Api\FruitProductionController;
use App\Http\Controllers\Api\DeviationComplaintController;

class DashboardController extends Controller
{
    public function processAllChartData(Request $request){
        $user = $request->user();
        $deviation_complaint = $param = $request->input('deviationcomplaints');
        $fruit_production = $param = $request->input('fruitproduction');
        $protein_lactose_water = $param = $request->input('proteinlactosewater');
        
        $deviaitonComplaintController = new DeviationComplaintController;
        $fruitProductionController = new FruitProductionController;
        $proteinLactosWaterController = new LabInputsController;
        $data = [
                'deviationcomplaints' => $deviation_complaint=='true' ? $deviaitonComplaintController->index($request):null,
                'fruitproduction' => $fruit_production=='true' ? $fruitProductionController->index($request):null,
                'proteinlactosewater' => $protein_lactose_water=='true' ? $proteinLactosWaterController->index($request):null,
        ];
        return response()->json(['data'=>$data],200);
    }
}
