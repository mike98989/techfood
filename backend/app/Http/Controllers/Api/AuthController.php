<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    public function signin(Request $request)
    {
        $request['email'] = $request['username'];
        // Validate the incoming request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find the user by email
        $user = User::with('settings')->where('email', $request->email)->first();

        // Check if user exists and password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['incorrect_credentials'],
            ]);
        }

        // Revoke any current user token
        if ($user->tokens()) {
            $user->tokens()->delete(); // Deletes all tokens for the user
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

    public function signout(Request $request)
    {
        // Revoke the token
        //$request->user()->currentAccessToken()->delete(); /// Revoke only current access
        $request->user()->tokens()->delete(); // Deletes all tokens for the user
        return response()->json(['message' => 'Logged out successfully from all devices']);
    }
}
