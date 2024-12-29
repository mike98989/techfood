<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Settings;
use Illuminate\Http\Request;

class Settingscontroller extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'settings' => 'required|array', 
        ]);
        $user = $request->user();
        $validatedData['user_id'] = $user->id;
        Settings::updateOrCreate(
            ['user_id' => $user->id],
            ['settings' => json_encode($validatedData['settings'])]
        );
        
        return response()->json(["message"=>"success_save_response","status"=>'1'],200);
    }

    public function show(Request $request)
    {

    }
}
