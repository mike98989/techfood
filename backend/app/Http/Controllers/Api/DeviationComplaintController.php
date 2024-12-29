<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\DeviationComplaint;
use App\Http\Controllers\Controller;
use App\Models\DeviationComplaintDangers;
use App\Models\DeviationComplaintSections;
use App\Models\DeviationComplaintLineTypes;
use App\Models\DeviationComplaintRemarkTypes;
use App\Models\DeviationComplaintProductTypes;
use App\Models\DeviationComplaintDeviationTypes;
use App\Models\DeviationComplaintRiskCategories;

class DeviationComplaintController extends Controller
{
    public function index(Request $request)
    {
        $paginate = $request->paginate;
        $user = $request->user();
        $data =  DeviationComplaint::where('user_id',$user->id)->with('deviation')->with('section')->with('code')->with('location')->with('risk_category')->with('code')->with('product')->orderBy('created_at', 'desc');

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
       
        $deviationComplaint =  DeviationComplaint::where('user_id',$user->id)->with('deviation')->with('section')->with('code')->with('location')->with('risk_category')->with('code')->with('product')->orderBy('created_at', 'desc');

        //// Search by range of dates
        $deviationComplaint = $deviationComplaint->when($request->start_date && $request->start_date!='', function ($query) use ($request) {
            return $request->end_date && $request->end_date!='' ? $query->whereBetween('occurance_date',[$request->start_date,$request->end_date]):$query->where('occurance_date','>',$request->start_date);
        });

         //// Search by status
         $deviationComplaint = $deviationComplaint->when($request->product && $request->product!='', function ($query) use ($request) {
            return $query->where('product_id',$request->product);
        });

        //// Search by section
        $deviationComplaint = $deviationComplaint->when($request->section && $request->section!='', function ($query) use ($request) {
            return $query->where('section_id',$request->section);
        });

        //// Search by Deviation Type
        $deviationComplaint = $deviationComplaint->when($request->deviation_type && $request->deviation_type!='', function ($query) use ($request) {
            return $query->where('deviation_type_id',$request->deviation_type);
        });
     
         ///////// IF THE REQUEST NEEDS PAGINATION
         $deviationComplaint = $deviationComplaint->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
        return response()->json(['data'=>$deviationComplaint],201);
    }

    public function getDeviationTypesForDeviationComplaint()
    {
       
        $data =  DeviationComplaintDeviationTypes::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }


    public function getDeviationCodesForDeviationComplaint()
    {
        $data =  DeviationComplaintRemarkTypes::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }
    

    public function getHazardTypes()
    {
       
        $data =  DeviationComplaintDangers::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function getRiskCategories()
    {
       
        $data =  DeviationComplaintRiskCategories::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function getProductTypes()
    {
       
        $data =  DeviationComplaintProductTypes::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }
    
    public function getLineTypes()
    {
       
        $data =  DeviationComplaintLineTypes::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }

    public function getSections()
    {
       
        $data =  DeviationComplaintSections::where('status','1')->orderBy('name', 'asc')->get();
        return response()->json(['data'=>$data],200);
    }
    
    public function store(Request $request)
    {
         
        $validatedData = $request->validate([
            'reference_number' => 'required',
            'title' => 'required',
            'batch_no'=>'required',
            'occurance_date' => 'required|date',
            'deviation_type_id' => 'required|integer',
            'deviation_code_id' => 'required|integer',
            'risk_category_id' => 'required|integer',
            'product_id' => 'required|integer',
        ]);
        $user = $request->user();
        $request['user_id'] = $user->id;
        DeviationComplaint::create($request->all());
        return response()->json(["message"=>"success_save_response","status"=>'1'],201);
    }


    public function update(Request $request, DeviationComplaint $deviationcomplaint)
    {
        $validatedData = $request->validate([
            'reference_number' => 'required',
            'title' => 'required',
            'batch_no'=>'required',
            'occurance_date' => 'required|date',
            'deviation_type_id' => 'required|integer',
            'deviation_code_id' => 'required|integer',
            'risk_category_id' => 'required|integer',
            'product_id' => 'required|integer',
            'location_id'=>'required|integer',
            'section_id'=>'required|integer',
        ]);
        $user = $request->user();
        $validatedData['user_id'] = $user->id;

        $deviationcomplaint->update($validatedData);

        return response()->json(["message"=>"success_save_response","status"=>'1'],201);
    }

    
    public function processAllRelatedTableData()
    {
        // Calling other methods and collecting their results
        // Return a consolidated response
        return response()->json(["data"=>[
            'product_types' => $this->getProductTypes(),
            'line_types' => $this->getLineTypes(),
            'sections' => $this->getSections(),
            'risk_categories' => $this->getRiskCategories(),
            'deviation_types' => $this->getDeviationTypesForDeviationComplaint(),
            'deviation_codes' => $this->getDeviationCodesForDeviationComplaint(),
        ]
        ],200);
    }


    public function destroy(DeviationComplaint $deviationcomplaint)
    {
        $deviationcomplaint->delete();
        return response()->json(["message"=>"success_delete_response","status"=>'1'],201);
    }
}
