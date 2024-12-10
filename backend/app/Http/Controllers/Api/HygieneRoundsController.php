<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\HygieneRounds;
use App\Http\Controllers\Controller;
use App\Models\HygieneRoundsProducts;
use App\Models\HygieneRoundsSections;
use App\Models\HygieneRoundsLineTypes;
use App\Models\HygieneRoundsDangerTypes;
use App\Models\HygieneRoundsDeviationCodes;
use App\Models\HygieneRoundsDeviationTypes;
use App\Models\HygieneRoundsRiskCategories;

class HygieneRoundsController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->paginate;
        $user = $request->user();
        $data =  HygieneRounds::where('user_id',$user->id)->with('deviation_type')->with('section')->with('deviation_code')->with('location')->with('risk_category')->with('deviation_code')->with('product')->with('danger')->orderBy('created_at', 'desc');

         ///////// IF THE REQUEST NEEDS PAGINATION
         $data = $data->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
        return response()->json(['data'=>$data],200);
    }

    public function getDeviationTypesForHygieneRounds()
    {
       
        $data =  HygieneRoundsDeviationTypes::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }


    public function getDeviationCodesForHygieneRounds()
    {
        $data =  HygieneRoundsDeviationCodes::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }
    

    public function getHygieneRoundsDangerTypes()
    {
       
        $data =  HygieneRoundsDangerTypes::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function getHygieneRoundsRiskCategories()
    {
       
        $data =  HygieneRoundsRiskCategories::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function getHygieneRoundsProductTypes()
    {
       
        $data =  HygieneRoundsProducts::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }
    
    public function getHygieneRoundsLineTypes()
    {
       
        $data =  HygieneRoundsLineTypes::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function getHygieneRoundsSections()
    {
       
        $data =  HygieneRoundsSections::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }
    
    public function store(Request $request)
    {
         
        $validatedData = $request->validate([
            'occurance_date' => 'required|date',
            'deviation_type_id' => 'required|integer',
            'deviation_code_id' => 'required|integer',
            'risk_category_id' => 'required|integer',
            'product_id' => 'required|integer',
            'danger_id' => 'required|integer',
            'location_id' => 'required|integer',
            'section_id' => 'required|integer',
        ]);
        $user = $request->user();
        $request['user_id'] = $user->id;
        HygieneRounds::create($request->all());
        return response()->json(["message"=>"success_save_response","status"=>'1'],201);
    }


    public function update(Request $request, HygieneRounds $hygieneround)
    {
        $validatedData = $request->validate([
            'occurance_date' => 'required|date',
            'deviation_type_id' => 'required|integer',
            'deviation_code_id' => 'required|integer',
            'risk_category_id' => 'required|integer',
            'product_id' => 'required|integer',
            'danger_id' => 'required|integer',
            'location_id' => 'required|integer',
            'section_id' => 'required|integer',
        ]);
        $user = $request->user();
        $validatedData['user_id'] = $user->id;

        $hygieneround->update($validatedData);

        return response()->json(["message"=>"success_save_response","status"=>'1'],201);
    }

    
    public function processAllRelatedTableData()
    {
        // Calling other methods and collecting their results
        // Return a consolidated response
        return response()->json(["data"=>[
            'product_types' => $this->getHygieneRoundsProductTypes(),
            'line_types' => $this->getHygieneRoundsLineTypes(),
            'sections' => $this->getHygieneRoundsSections(),
            'risk_categories' => $this->getHygieneRoundsRiskCategories(),
            'deviation_types' => $this->getDeviationTypesForHygieneRounds(),
            'deviation_codes' => $this->getDeviationCodesForHygieneRounds(),
            'danger_types' => $this->getHygieneRoundsDangerTypes(),
        ]
        ],200);
    }


    public function destroy(HygieneRounds $hygieneround)
    {
        $hygieneround->delete();
        return response()->json(["message"=>"success_delete_response","status"=>'1'],201);
    }
}
