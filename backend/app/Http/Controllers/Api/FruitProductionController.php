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
        $paginate = $request->paginate;
        $user = $request->user();
        $data =  FruitProduction::where('user_id',$user->id)->orderBy('created_at', 'desc')->with('status_type')->with('section')->with('cause')->with('deviation');

         ///////// IF THE REQUEST NEEDS PAGINATION
         $data = $data->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
            
        return response()->json(['data'=>$data],200);
    }

    public function search(Request $request)
    {
        $paginate = $request->paginate;
        $user = $request->user();
        //$labinputs = new LabInputs;
       
        $fruitproduction =  FruitProduction::where('user_id',$user->id)->orderBy('created_at', 'desc')->with('status_type')->with('section')->with('cause')->with('deviation');

        //// Search by range of dates
        $fruitproduction = $fruitproduction->when($request->start_date && $request->start_date!='', function ($query) use ($request) {
            return $request->end_date && $request->end_date!='' ? $query->whereBetween('date',[$request->start_date,$request->end_date]):$query->where('date','>',$request->start_date);
        });

        //// Search by cause
        $fruitproduction = $fruitproduction->when($request->cause && $request->cause!='', function ($query) use ($request) {
            return $query->where('cause_id',$request->cause);
        });

         //// Search by status
         $fruitproduction = $fruitproduction->when($request->status_id && $request->status_id!='', function ($query) use ($request) {
            return $query->where('status',$request->status_id);
        });

        //// Search by section
        $fruitproduction = $fruitproduction->when($request->section && $request->section!='', function ($query) use ($request) {
            return $query->where('section_id',$request->section);
        });

        //// Search by Deviation Type
        $fruitproduction = $fruitproduction->when($request->deviation_type && $request->deviation_type!='', function ($query) use ($request) {
            return $query->where('deviation_type_id',$request->deviation_type);
        });
     
         ///////// IF THE REQUEST NEEDS PAGINATION
         $fruitproduction = $fruitproduction->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
        return response()->json(['data'=>$fruitproduction],201);
    }

    public function getFruits()
    {
        $data =  Fruits::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function getCauses()
    {
        $data =  FruitProductionCauses::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function getStatus()
    {
        $data =  FruitProductionStatusTypes::where('status','1')->orderBy('id', 'asc')->get();;
        return response()->json(['data'=>$data],200);
    }

    public function getDeviationTypes()
    {
        $data =  FruitProductionDeviationTypes::where('status','1')->orderBy('name', 'asc')->get();;
        return response()->json(['data'=>$data],200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            '*.date' => 'required|string',
            '*.section_id' => 'required|integer',
            '*.status' => 'required|integer',
            '*.cause_id' => 'required|integer',
            '*.deviation_type_id' => 'required|integer',
        ]);
        $user = $request->user();
        // Use a transaction to handle multiple inserts
        foreach ($validatedData as $data) {
            $data['user_id'] = $user->id; 
            FruitProduction::create($data);
        }
  

        return response()->json(["message"=>"success_save_response","status"=>'1'],200);
    }

    public function update(Request $request, FruitProduction $fruitproduction)
    {
        $validatedData = $request->validate([
            'date' => 'required|string',
            'section_id' => 'required|integer',
            'status' => 'required|integer',
            'cause_id' => 'required|integer',
            'deviation_type_id' => 'required|integer',
        ]);
        $user = $request->user();
        $validatedData['user_id'] = $user->id;
        // Use a transaction to handle multiple inserts
        // foreach ($validatedData as $data) {
        //     $data['user_id'] = $user->id; 
        //     FruitProduction::create($data);
        // }

        $fruitproduction->update($validatedData);

        return response()->json(["message"=>"success_save_response","status"=>'1'],201);
    }

    public function destroy(FruitProduction $fruitproduction)
    {
        $fruitproduction->delete();
        return response()->json(["message"=>"success_delete_response","status"=>'1'],201);
    }

    public function processAllRelatedTableData()
    {
        // Calling other methods and collecting their results
        // Return a consolidated response
        return response()->json(["data"=>[
            'sections' => $this->getFruits(),
            'causes' => $this->getCauses(),
            'statuses' => $this->getStatus(),
            'deviation_types' => $this->getDeviationTypes(),
        ]
        ],200);
    }

}
