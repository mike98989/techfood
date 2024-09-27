<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LabInputs;
use Illuminate\Http\Request;

class LabInputsController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data =  LabInputs::all();
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
        //
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
