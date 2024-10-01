<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        // Check if user exists and password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Create a token for the user
        $token = $user->createToken('TechFood')->plainTextToken;

       // Set token and user data in cookies
       $cookieToken = cookie('auth_token', $token, 60 * 24,'/', null, true, true, false, 'None'); // 24 hours
    //    $cookieUserData = cookie('user_data', $user, 60 * 24,'/', null, true, true, false, 'None'); // 24 hours

    //    return response()->json(['message' => 'Login successful','status'=>'1'], 200)
    //                     ->withCookie($cookieToken)
    //                     ->withCookie($cookieUserData);

        // Return the token and user info
        return response()->json([
            'user' => $user,
            'token'=>$token,
            'status'=>"1"
        ],200)->withCookie($cookieToken);
    }

    public function logout(Request $request)
    {
        // Revoke the token
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Logged out successfully']);
    }
}
