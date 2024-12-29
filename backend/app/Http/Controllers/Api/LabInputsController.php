<?php

namespace App\Http\Controllers\Api;

use App\Models\LabInputs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class LabInputsController extends Controller
{
    
    public function index(Request $request)
    {
        $paginate = $request->paginate;
        $user = $request->user();
        $data =  LabInputs::where('user_id',$user->id)->orderBy('created_at', 'desc');
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
        //$labinputs = new LabInputs;
        $labinputs =  LabInputs::where('user_id',$user->id)->where('status','1')->orderBy('created_at', 'desc');
        //// Search by range of dates to filter out date of arrival into the custodial center
        $labinputs = $labinputs->when($request->start_date && $request->start_date!='', function ($query) use ($request) {
            return $request->end_date && $request->end_date!='' ? $query->whereBetween('result_date',[$request->start_date,$request->end_date]):$query->where('result_date','>',$request->start_date);
        });

        //// Search by Limit for satisfactory or not satisfactory
        $labinputs = $labinputs->when($request->satisfactory_or_not, function ($query) use ($request) {
            $column_and_limit = explode('-',$request->column);
            $column=$column_and_limit[0];
            $limit=(float) $column_and_limit[1];
            $satisfactory_or_not = trim($request->satisfactory_or_not);
            
            if($satisfactory_or_not === "-1"){ ////Satisfactory is 1 and -1 is not satisfactory
                $compare = "<";
            }else{
                $compare = ">=";
            }
            return $query->where($column,$compare,$limit);
        });
        
         ///////// IF THE REQUEST NEEDS PAGINATION
         $labinputs = $labinputs->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
        return response()->json(['data'=>$labinputs],201);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validatedData = $request->validate([
            '*.poNumber' => 'required|string',
            '*.batches' => 'required|array',
            '*.batches.*.batchNumber' => 'required|string',
            '*.batches.*.proteinValue' => 'nullable|numeric',
            '*.batches.*.lactoseValue' => 'nullable|numeric',
            '*.batches.*.waterValue' => 'nullable|numeric',
            '*.batches.*.derivedDate' => 'required|date',
        ]);
        $user = $request->user();
            // Use a transaction to handle multiple inserts
        DB::transaction(function () use ($validatedData, $user) {
        // Loop through each PO entry in the request
        foreach ($validatedData as $poData) {
            // Save each batch associated with the PO Number
            foreach ($poData['batches'] as $batchData) {
                LabInputs::create([
                    'user_id'=>$user->id,
                    'PO_number' => $poData['poNumber'],  // Foreign key to purchase_orders
                    'batch_number' => $batchData['batchNumber'],
                    'protein_value' => $batchData['proteinValue'],
                    'lactose_value' => $batchData['lactoseValue'],
                    'water_value' => $batchData['waterValue'],
                    'result_date' => $batchData['derivedDate'],
                ]);
            }
        }
    });

        return response()->json(["message"=>"success_save_protein_lactose_water","status"=>'1'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(LabInputs $labInputs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LabInputs $labInputs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LabInputs $labinput)
    {
        $validatedData = $request->validate([
            'PO_number' => 'required|string',
            'batch_number' => 'required|string',
            'protein_value' => 'nullable|integer',
            'lactose_value' => 'nullable|integer',
            'water_value' => 'nullable|integer',
            'result_date'=>'required|date',
        ]);
        $user = $request->user();
        $validatedData['user_id'] = $user->id;
        
        $labinput->update($validatedData);

        return response()->json(["message"=>"success_save_response","status"=>'1'],201);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LabInputs $labinput)
    {
        $labinput->delete();
        return response()->json(["message"=>"success_delete_response","status"=>'1'],201);
    }
}
