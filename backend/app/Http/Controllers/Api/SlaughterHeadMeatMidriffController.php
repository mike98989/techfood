<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\DrillSampleAnimals;
use App\Models\DrillSampleProducts;
use App\Http\Controllers\Controller;
use App\Models\SlaughterHeadMeatMidriff;

class SlaughterHeadMeatMidriffController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $data =  SlaughterHeadMeatMidriff::where('user_id',$user->id)->with('animal')->with('product')->orderBy('created_at', 'desc')->get();
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
            '*.e_coli' => 'nullable|numeric',
            '*.staphylococcus' => 'nullable|numeric',
        ]);
        $user = $request->user();
        // Use a transaction to handle multiple inserts
        foreach ($validatedData as $data) {
            $data['user_id'] = $user->id; 
            SlaughterHeadMeatMidriff::create($data);
        }

        return response()->json(["message"=>"success_save_response","status"=>'1'],200);
    }

    public function update(Request $request, SlaughterHeadMeatMidriff $headmidriff)
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
            'e_coli' => 'nullable|numeric',
            'staphylococcus' => 'nullable|numeric',
        ]);
        $user = $request->user();
        $validatedData['user_id'] = $user->id;
        
        $headmidriff->update($validatedData);

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

    public function destroy(SlaughterHeadMeatMidriff $headmidriff)
    {
        $headmidriff->delete();
        return response()->json(["message"=>"success_delete_response","status"=>'1'],201);
    }
}
