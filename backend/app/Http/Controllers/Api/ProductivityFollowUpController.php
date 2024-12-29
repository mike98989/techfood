<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ProductivityFollowUp;

class ProductivityFollowUpController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->paginate;
        $user = $request->user();
        $data =  ProductivityFollowUp::where('user_id',$user->id)->orderBy('created_at', 'desc');
        
         ///////// IF THE REQUEST NEEDS PAGINATION
         $data = $data->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
        return response()->json(['data'=>$data],201);
        
    }


    public function store(Request $request)
    {
        
        $validatedData = $request->validate([
            '*.day' => 'required|string',
            '*.week' => 'required|integer',
            '*.year' => 'required|integer',
            '*.total_available_hours' => 'required|integer',
            '*.pork' => 'nullable|integer',
            '*.lamb' => 'nullable|integer',
            '*.beef' => 'nullable|integer',
            '*.maintenance_hours' => 'nullable|integer',
            '*.ack_output_qty' => 'nullable|integer',
            '*.ack_output_time' => 'nullable|integer',
            '*.ack_target_qty' => 'required|integer',
            '*.ack_target_time' => 'nullable|integer',
            '*.available_production_hours' => 'nullable|integer',
            '*.deviation_from_contract_qty' => 'nullable|integer',
            '*.deviation_from_contract_time' => 'nullable|integer',
            '*.output_per_day' => 'nullable|integer',
            '*.output_per_day_per_time' => 'nullable|integer',
            '*.output_percent' => 'nullable|integer',
            '*.total_target_per_day' => 'nullable|integer',
            '*.weekly_target' => 'nullable|integer',
            '*.weekly_rate' => 'nullable|integer',
            '*.average_rate' => 'nullable|numeric',
            '*.accumulated' => 'nullable|integer',
        ]);
        $user = $request->user();
        // Loop through each PO entry in the request
        foreach ($validatedData as $data) {
            $data['user_id'] = $user->id; 
        $check = ProductivityFollowUp::where('user_id','=', $user->id)->where('week','=',$data['week'])->where('day','=',$data['day'])->where('year','=',$data['year'])->exists();
            if(!$check){
            ProductivityFollowUp::create($data);
            $message = "success_save_response";
            $statusCode = 200;
            $messageStatus='1';
            }else{
            $message = "some_data_exist_for_week";
            $messageStatus='2'; 
            $statusCode = 422;  
            }
            //ProductivityFollowUp::create($data);
        }

        return response()->json(["message"=>$message,"status"=>'1'],200);
    }

    public function update(Request $request)
    {
        
        $validatedData = $request->validate([
            '*.id' => 'required|integer',
            '*.day' => 'required|string',
            '*.week' => 'required|integer',
            '*.year' => 'required|integer',
            '*.total_available_hours' => 'required|integer',
            '*.pork' => 'nullable|integer',
            '*.lamb' => 'nullable|integer',
            '*.beef' => 'nullable|integer',
            '*.maintenance_hours' => 'nullable|integer',
            '*.ack_output_qty' => 'nullable|integer',
            '*.ack_output_time' => 'nullable|integer',
            '*.ack_target_qty' => 'required|integer',
            '*.ack_target_time' => 'nullable|integer',
            '*.available_production_hours' => 'nullable|integer',
            '*.deviation_from_contract_qty' => 'nullable|integer',
            '*.deviation_from_contract_time' => 'nullable|integer',
            '*.output_per_day' => 'nullable|integer',
            '*.output_per_day_per_time' => 'nullable|integer',
            '*.output_percent' => 'nullable|string',
            '*.total_target_per_day' => 'nullable|integer',
            '*.weekly_target' => 'nullable|integer',
            '*.weekly_rate' => 'nullable|integer',
            '*.average_rate' => 'nullable|numeric',
            '*.accumulated' => 'nullable|integer',
        ]);
        $user = $request->user();
        // Loop through each PO entry in the request
        foreach ($validatedData as $data) {
        $data['user_id'] = $user->id; 
        //////Get the record model    
        $check = ProductivityFollowUp::where('user_id','=', $user->id)->where('id','=',$data['id'])->first();
            if($check){
                ////Check if there exist a record for the week
                $check_week = ProductivityFollowUp::where('user_id','=', $user->id)->where('week','=',$data['week'])->where('day','=',$data['day'])->where('year','=',$data['year'])->whereNot('id',$data['id'])->exists();
                if(!$check_week){
                    $check->update($data); 
                    $message = "success_save_response";
                    $messageStatus='1';
                    $statusCode = 200;
                }else{
                    $message = "Data already exist for this day and week! ";
                    $messageStatus='0';
                    $statusCode = 422;   
                }
                
            }
            
        }

        return response()->json(["message"=>$message,"status"=>$messageStatus],$statusCode);
    }
}
