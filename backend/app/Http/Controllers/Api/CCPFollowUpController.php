<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CCPFollowUp;
use Illuminate\Http\Request;

class CCPFollowUpController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->paginate;
        $user = $request->user();
        $data =  CCPFollowUp::where('user_id',$user->id)->with('animal')->orderBy('date', 'desc');

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

        $ccpfollowup =  CCPFollowUp::where('user_id',$user->id)->with('animal')->orderBy('date', 'desc');

        //// Search by range of dates to filter out date of arrival into the custodial center
        $ccpfollowup = $ccpfollowup->when($request->start_date && $request->start_date!='', function ($query) use ($request) {
            return $request->end_date && $request->end_date!='' ? $query->whereBetween('date',[$request->start_date,$request->end_date]):$query->where('date','>',$request->start_date);
        });

         ///////// IF THE REQUEST NEEDS PAGINATION
         $ccpfollowup = $ccpfollowup->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
        return response()->json(['data'=>$ccpfollowup],201);
    }

    public function store(Request $request)
    {
       
        $validatedData = $request->validate([
            'slaughtered_total' => 'required|integer',
            'slaughter' => 'required|string',
            'date' => 'required|date',
            'total' => 'required|integer',
            'clean' => 'required|integer',
            'percent' => 'required|integer',
            'verify_or_monitor' => 'required|string',
            'week' => 'required|integer',
            
        ]);
        $user = $request->user();
        $request['user_id'] = $user->id;
        CCPFollowUp::create($request->all());
       
        return response()->json(["message"=>"success_save_response","status"=>'1'],200);
    }

    public function destroy(CCPFollowUp $ccpfollowup)
    {
        $ccpfollowup->delete();
        return response()->json(["message"=>"success_delete_response","status"=>'1'],201);
    }
}
