<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\MapDetectedBacteria;
use App\Http\Controllers\Controller;
use App\Models\MapDetectedBacteriaImagePath;
use App\Models\MapDetectedBacteriaCoordinates;

class MapDetectedBacteriaController extends Controller
{
    
    public function index(Request $request)
    {
        $paginate = $request->paginate;
        $user = $request->user();
        $data =  MapDetectedBacteria::where('user_id',$user->id)->with("coordinate.image")->orderBy('id', 'desc');

         ///////// IF THE REQUEST NEEDS PAGINATION
         $data = $data->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
        return response()->json(['data'=>$data],200);
    }


    public function store(Request $request)
    {
        
        $validatedData = $request->validate([
            '*.date' => 'required|string',
            '*.data' => 'required|array', 
            '*.coordinateId' => 'required|string', 
        ]);
        $user = $request->user();
        // Use a transaction to handle multiple inserts
        DB::transaction(function () use ($validatedData, $user) {
        // Loop through each PO entry in the request
        foreach ($validatedData as $bacteriaData) {
            // Save each batch associated with the PO Number
            //foreach ($bacteriaData['data'] as $data) {
                MapDetectedBacteria::create([
                    'user_id'=>$user->id,
                    'date' => $bacteriaData['date'],
                    'detected_values' => json_encode($bacteriaData['data']),
                    'coordinate_id' => $bacteriaData['coordinateId'],
                ]);
            //}
        }
    });

        return response()->json(["message"=>"success_save_response","status"=>'1'],200);
    }

    public function destroy(MapDetectedBacteria $mapdetectedbacterium)
    {
        $mapdetectedbacterium->delete();
        return response()->json(["message"=>"success_delete_response","status"=>'1'],201);
    }

    public function update(Request $request, MapDetectedBacteria $mapdetectedbacterium)
    {
        //return response()->json(["message"=>$request->all(),"status"=>'2'],201);

        $validatedData = $request->validate([
            'date' => 'required|string',
            'detected_values' => 'required|string', 
            'coordinate_id' => 'required|integer', 
        ]);
        $user = $request->user();
        $validatedData['user_id'] = $user->id;

        $mapdetectedbacterium->update($validatedData);

        return response()->json(["message"=>"success_save_response","status"=>'1'],201);
    }

    public function getCoordinates(Request $request)
    {
        $user = $request->user();
        $coordinates =  MapDetectedBacteriaCoordinates::where('status',1)->where('user_id',$user->id)->with('image')->orderBy('title', 'desc')->get();
        return response()->json(['data'=>$coordinates],200);
    }
}
