<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OEEFollowUp;
use Illuminate\Http\Request;

class OEEFollowUpController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->paginate;
        $user = $request->user();
        $data =  OEEFollowUp::where('user_id',$user->id)->orderBy('created_at', 'desc');
        
         ///////// IF THE REQUEST NEEDS PAGINATION
         $data = $data->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
        return response()->json(['data'=>$data],201);
        
    }

    public function search(Request $request)
    {
        $paginate = $request->paginate;
        $user = $request->user();

        $oeefollowup =  OEEFollowUp::where('user_id',$user->id)->orderBy('date', 'desc');

        //// Search by range of dates
        $oeefollowup = $oeefollowup->when($request->start_date && $request->start_date!='', function ($query) use ($request) {
            return $request->end_date && $request->end_date!='' ? $query->whereBetween('date',[$request->start_date,$request->end_date]):$query->where('date','>',$request->start_date);
        });

        //// Search by avaibility greater than the value
        $oeefollowup = $oeefollowup->when($request->availability && $request->availability!='', function ($query) use ($request) {
            return $query->where('availability',$request->operator,$request->availability);
        });

        //// Search by section
        $oeefollowup = $oeefollowup->when($request->performance && $request->performance!='', function ($query) use ($request) {
            return $query->where('performance',$request->operator,$request->performance);
        });

        //// Search by Deviation Type
        $oeefollowup = $oeefollowup->when($request->quality && $request->quality!='', function ($query) use ($request) {
            return $query->where('quality',$request->operator,$request->quality);
        });

         ///////// IF THE REQUEST NEEDS PAGINATION
         $oeefollowup = $oeefollowup->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
        return response()->json(['data'=>$oeefollowup],201);
    }

    public function store(Request $request)
    {
       
        $validatedData = $request->validate([
            'overall_oee' => 'required|numeric',
            'availability' => 'required|numeric',
            'performance' => 'required|numeric',
            'quality' => 'required|numeric',
            'planned_production_time' => 'required|integer',
            'total_meal_break' => 'required|integer',
            'total_planned_break' => 'required|integer',
            'total_working_hours_daily' => 'required|integer',
            'rejected_piece' => 'required|integer',
            'total_quality_piece' => 'required|integer',
            'run_rate_in_ppm' => 'required|integer',
            'down_time_in_min' => 'required|integer',
            'default_meal_break_in_min' => 'required|integer',
            'number_of_meal_break' => 'required|integer',
            'default_planned_break_in_min' => 'required|integer',
            'number_of_planned_break' => 'required|integer',
            
        ]);
        $user = $request->user();
        $request['user_id'] = $user->id;
        OEEFollowUp::create($request->all());
       
        return response()->json(["message"=>"success_save_response","status"=>'1'],200);
    }

    public function update(Request $request, OEEFollowUp $oeefollowup)
    {
        $validatedData = $request->validate([
            'overall_oee' => 'required|numeric',
            'availability' => 'required|numeric',
            'performance' => 'required|numeric',
            'quality' => 'required|numeric',
            'planned_production_time' => 'required|integer',
            'total_meal_break' => 'required|integer',
            'total_planned_break' => 'required|integer',
            'total_working_hours_daily' => 'required|integer',
            'rejected_piece' => 'required|integer',
            'total_quality_piece' => 'required|integer',
            'run_rate_in_ppm' => 'required|integer',
            'down_time_in_min' => 'required|integer',
            'default_meal_break_in_min' => 'required|integer',
            'number_of_meal_break' => 'required|integer',
            'default_planned_break_in_min' => 'required|integer',
            'number_of_planned_break' => 'required|integer',
            
        ]);
        $user = $request->user();
        $validatedData['user_id'] = $user->id;
        
        $oeefollowup->update($validatedData);

        return response()->json(["message"=>"success_save_response","status"=>'1'],201);
    }

    public function destroy(OEEFollowUp $oeefollowup)
    {
        $oeefollowup->delete();
        return response()->json(["message"=>"success_delete_response","status"=>'1'],201);
    }
}
