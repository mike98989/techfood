<?php

namespace App\Http\Controllers\Api;

use App\Models\LabInputs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class LabInputsController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $data =  LabInputs::where('user_id',$user->id)->orderBy('created_at', 'desc')->get();
        return response()->json(['data'=>$data],200);
        
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
            '*.batches.*.proteinValue' => 'nullable|string',
            '*.batches.*.lactoseValue' => 'nullable|string',
            '*.batches.*.waterValue' => 'nullable|string',
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

        return response()->json(["message"=>"Lab data saved successfully","status"=>'1'],200);
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
    public function update(Request $request, LabInputs $labInputs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LabInputs $labInputs)
    {
        //
    }
}
