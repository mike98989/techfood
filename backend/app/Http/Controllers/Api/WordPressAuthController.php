<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WordPressAuthController extends Controller
{
    
    public function signin(Request $request)
    {
        
        
        // return response()->json(['error' => "<strong>ERROR</strong>: The username or password you entered is incorrect. <a href=\"https://techfood.se/mitt-konto/lost-password/\" title=\"Password Lost and Found\">Lost your password</a>?"], 401);
        // Get the login credentials from the request
        $credentials = $request->only('username', 'password');

        // Prepare the login array for wp_signon
        $login_data = [
            'user_login'    => $credentials['username'],
            'user_password' => $credentials['password'],
            'remember'      => true
        ];

        // Attempt to log the user in
        $user = wp_signon($login_data, false);

        // Check for login success
        if (is_wp_error($user)) {
            // Handle login failure
            return response()->json(['error' => $user->get_error_message()], 401);
        } else {
            // Login successful
            return response()->json(['message' => 'Login successful', 'user' => $user]);
        }
    }
}
