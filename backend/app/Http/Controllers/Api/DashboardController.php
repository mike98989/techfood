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
        $drill_samples = $param = $request->input('drillsamples');
        $headmidriff = $param = $request->input('headmidriff');
        $ccpfollowup = $param = $request->input("ccpfollowups");
        $staffingproduction = $param = $request->input("staffingproduction");
        $oeefollowup = $param = $request->input("oeefollowups");
        $deviaitonComplaintController = new DeviationComplaintController;
        $fruitProductionController = new FruitProductionController;
        $proteinLactosWaterController = new LabInputsController;
        $drillSampleController = new DrillSampleController;
        $headMidRiffController = new SlaughterHeadMeatMidriffController;
        $ccpFollowUpController = new CCPFollowUpController;
        $staffingProductionController = new StaffingProductionController;
        $oeeFollowUpController = new OEEFollowUpController;
        $data = [
                'deviationcomplaints' => $deviation_complaint=='true' ? $deviaitonComplaintController->index($request):null,
                'fruitproduction' => $fruit_production=='true' ? $fruitProductionController->index($request):null,
                'proteinlactosewater' => $protein_lactose_water=='true' ? $proteinLactosWaterController->index($request):null,
                'drillsamples' => $drill_samples=='true' ? $drillSampleController->index($request):null,
                'headmidriff' => $headmidriff=='true' ? $headMidRiffController->index($request):null,
                'ccpfollowups' => $ccpfollowup=='true' ? $ccpFollowUpController->index($request):null,
                'staffingproduction' => $staffingproduction=='true' ? $staffingProductionController->index($request):null,
                'oeefollowups' => $oeefollowup=='true' ? $oeeFollowUpController->index($request):null,
                
        ];

        return response()->json(['data'=>$data],200);
    }
}
