<?php

namespace App\Http\Controllers\Api;

use App\Models\FruitProductionStatusTypes;
use App\Models\Fruits;
use Illuminate\Http\Request;
use App\Models\FruitProduction;
use App\Http\Controllers\Controller;
use App\Models\FruitProductionCauses;
use App\Models\FruitProductionDeviationTypes;
use Illuminate\Support\Facades\DB;
class FruitProductionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $data =  FruitProduction::where('user_id',$user->id)->orderBy('created_at', 'desc')->with('status_type')->get();
        return response()->json(['data'=>$data],200);
    }


    public function getFruits()
    {
        $data =  Fruits::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function getCauses()
    {
        $data =  FruitProductionCauses::where('status','1')->orderBy('cause', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function getStatus()
    {
        $data =  FruitProductionStatusTypes::where('status','1')->orderBy('id', 'asc')->get();;
        return response()->json(['data'=>$data],200);
    }

    public function getDeviationTypes()
    {
        $data =  FruitProductionDeviationTypes::where('status','1')->orderBy('type', 'asc')->get();;
        return response()->json(['data'=>$data],200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            '*.date' => 'required|string',
            '*.section' => 'required|string',
            '*.status' => 'required|string',
            '*.cause' => 'required|string',
            '*.deviation_type' => 'required|string',
        ]);
        $user = $request->user();
        // Use a transaction to handle multiple inserts
        foreach ($validatedData as $data) {
            $data['user_id'] = $user->id; 
            FruitProduction::create($data);
        }
  

        return response()->json(["message"=>"Data saved successfully","status"=>'1'],200);
    }

    public function update(Request $request, FruitProduction $fruitproduction)
    {
        $validatedData = $request->validate([
            'date' => 'required|string',
            'section' => 'required|string',
            'status' => 'required|string',
            'cause' => 'required|string',
            'deviation_type' => 'required|string',
        ]);
        $user = $request->user();
        $validatedData['user_id'] = $user->id;
        // Use a transaction to handle multiple inserts
        // foreach ($validatedData as $data) {
        //     $data['user_id'] = $user->id; 
        //     FruitProduction::create($data);
        // }

        $fruitproduction->update($validatedData);

        return response()->json(["message"=>"Records updated successfully","status"=>'1'],201);
    }

    public function destroy(FruitProduction $fruitproduction)
    {
        $fruitproduction->delete();
        return response()->json(["message"=>"Resource deleted successfully","status"=>'1'],201);
    }

    public function processAllRelatedTableData()
    {
        // Calling other methods and collecting their results
        // Return a consolidated response
        return response()->json(["data"=>[
            'fruits' => $this->getFruits(),
            'causes' => $this->getCauses(),
            'statuses' => $this->getStatus(),
            'deviation_types' => $this->getDeviationTypes(),
        ]
        ],200);
    }

}
