<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Translations;
use Illuminate\Http\Request;

class GenericController extends Controller
{
    public function index(Request $request)
    {

        $translation =  Translations::get();
        return response()->json(['data'=>$translation],200);
    }
}
