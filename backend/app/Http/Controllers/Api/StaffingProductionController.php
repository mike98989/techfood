<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StaffingProduction;
use Illuminate\Http\Request;

class StaffingProductionController extends Controller
{
    public function index(Request $request)
    {
    $user = $request->user();
    $data =  StaffingProduction::where('user_id',$user->id)->orderBy('created_at', 'desc')->get();
    return response()->json(['data'=>$data],201);
    }

    public function store(Request $request)
    {
       
        $validatedData = $request->validate([
            'week' => 'required|integer',
            'day' => 'required|string',
            'year' => 'required|integer',
            'weekly_total_hours_worked' => 'required|integer',
            'supervisor' => 'required|integer',
            'quality_control' => 'required|integer',
            'operator_staff' => 'required|integer',
            'total_hours' => 'required|integer',
            'production_quantity' => 'required|integer',
        ]);
        $user = $request->user();
        $request['user_id'] = $user->id;
        $check = StaffingProduction::where('user_id','=', $user->id)->where('week','=',$request->week)->where('day','=',$request->day)->where('year','=',$request->year)->exists();
        if(!$check){
        StaffingProduction::create($request->all());
        $message = "success_save_response";
        $statusCode = 200;
        $messageStatus='1';
        }else{
        $message = "Data already exist for this day and week! ";
        $messageStatus='2'; 
        $statusCode = 422;  
        }
       
        return response()->json(["message"=>$message,"status"=>$messageStatus],$statusCode);
    }

    public function update(Request $request, StaffingProduction $staffingproduction)
    {
        $validatedData = $request->validate([
            'week' => 'required|integer',
            'day' => 'required|string',
            'year' => 'required|integer',
            'weekly_total_hours_worked' => 'required|integer',
            'supervisor' => 'required|integer',
            'quality_control' => 'required|integer',
            'operator_staff' => 'required|integer',
            'total_hours' => 'required|integer',
            'production_quantity' => 'required|integer',
        ]);
        $user = $request->user();
        $validatedData['user_id'] = $user->id;
        $user = $request->user();
        $request['user_id'] = $user->id;
        $check = StaffingProduction::where('user_id','=', $user->id)->where('week','=',$request->week)->where('day','=',$request->day)->where('year','=',$request->year)->whereNot('id',$request->id)->exists();
        if(!$check){
        $staffingproduction->update($validatedData);
        $message = "success_save_response";
        $messageStatus='1';
        $statusCode = 200;
        }else{
        $message = "Data already exist for this day and week! ";
        $messageStatus='0';
        $statusCode = 422;   
        }

        return response()->json(["message"=>$message,"status"=>$messageStatus],$statusCode);
    }

    public function destroy(StaffingProduction $staffingproduction)
    {
        $staffingproduction->delete();
        return response()->json(["message"=>"success_delete_response","status"=>'1'],201);
    }
}
