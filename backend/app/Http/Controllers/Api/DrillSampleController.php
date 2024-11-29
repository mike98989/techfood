<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\DrillSample;
use App\Models\DrillSampleAnimals;
use App\Models\DrillSampleProducts;
use Illuminate\Http\Request;

class DrillSampleController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->paginate;
        $user = $request->user();
        $data =  DrillSample::where('user_id',$user->id)->with('animal')->with('product')->orderBy('created_at', 'desc');

         ///////// IF THE REQUEST NEEDS PAGINATION
         $data = $data->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
        return response()->json(['data'=>$data],201);
        
    }

    public function getProducts()
    {
        $data =  DrillSampleProducts::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function store(Request $request)
    {
        
        $validatedData = $request->validate([
            '*.week' => 'required|integer',
            '*.slaughter_number' => 'required|string',
            '*.slaughter_house' => 'required|string',
            '*.product_id' => 'required|integer',
            '*.slaughter_date' => 'nullable|date',
            '*.pieces_date' => 'nullable|date',
            '*.animal_id' => 'nullable|integer',
            '*.aerobic' => 'nullable|numeric',
            '*.enterobacta' => 'nullable|numeric',
        ]);
        $user = $request->user();
        // Use a transaction to handle multiple inserts
        foreach ($validatedData as $data) {
            $data['user_id'] = $user->id; 
            DrillSample::create($data);
        }

        return response()->json(["message"=>"success_save_response","status"=>'1'],200);
    }

    public function update(Request $request, DrillSample $drillsample)
    {
        $validatedData = $request->validate([
            'week' => 'required|integer',
            'slaughter_number' => 'required|string',
            'slaughter_house' => 'required|string',
            'product_id' => 'required|integer',
            'slaughter_date' => 'nullable|date',
            'pieces_date' => 'nullable|date',
            'animal_id' => 'nullable|integer',
            'aerobic' => 'nullable|numeric',
            'enterobacta' => 'nullable|numeric',
        ]);
        $user = $request->user();
        $validatedData['user_id'] = $user->id;
        
        $drillsample->update($validatedData);

        return response()->json(["message"=>"success_save_response","status"=>'1'],201);
    }
    
    
    public function getAnimals()
    {
        $data =  DrillSampleAnimals::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function processAllRelatedTableData()
    {
        // Calling other methods and collecting their results
        // Return a consolidated response
        return response()->json(["data"=>[
            'products' => $this->getProducts(),
            'animal' => $this->getAnimals(),
        ]
        ],200);
    }

    public function destroy(DrillSample $drillsample)
    {
        $drillsample->delete();
        return response()->json(["message"=>"success_delete_response","status"=>'1'],201);
    }
}
