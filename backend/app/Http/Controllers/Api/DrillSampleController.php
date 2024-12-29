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

    public function search(Request $request)
    {
        $paginate = $request->paginate;
        $user = $request->user();

        $drillSample =  DrillSample::where('user_id',$user->id)->with('animal')->with('product')->orderBy('created_at', 'desc');

        //// Search by range of dates to filter out date of arrival into the custodial center
        $drillSample = $drillSample->when($request->start_date && $request->start_date!='', function ($query) use ($request) {
            return $request->end_date && $request->end_date!='' ? $query->whereBetween('slaughter_date',[$request->start_date,$request->end_date]):$query->where('slaughter_date','>',$request->start_date);
        });

        //// Search by Limit for satisfactory or not satisfactory
        $drillSample = $drillSample->when($request->satisfactory_or_not, function ($query) use ($request) {
            $column_and_limit = explode('-',$request->column);
            $column=$column_and_limit[0];
            $limit=(float) $column_and_limit[1];
            $satisfactory_or_not = trim($request->satisfactory_or_not);
            
            if($satisfactory_or_not === "-1"){ ////Satisfactory is 1 and -1 is not satisfactory
                $compare = ">";
            }else{
                $compare = "<=";
            }
            return $query->where($column,$compare,$limit);
        });

     
         ///////// IF THE REQUEST NEEDS PAGINATION
         $drillSample = $drillSample->when($request->paginate, function($query) use($request,$paginate){
            return $paginate!='all' ? $query->paginate($paginate) : $query->get();
            });
        return response()->json(['data'=>$drillSample],201);
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
