<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
            // Login successful, create a user instance on the techfood user if the user does not exist in the database
            $techfood_user = User::where('parent_id', $user->data->ID)->first();
            //return response()->json(["user"=>$techfood_user. "u".$user->data->ID],200);

            if(!$techfood_user){
            $techfood_user = User::create([
                'name' => $user->data->display_name,
                'email' => $user->data->user_email,
                'parent_id' => $user->data->ID,
            ]);
            }
            // Create a token for the user
            $token = $techfood_user->createToken('TechFood')->plainTextToken;

        // Set token and user data in cookies
       $cookieToken = cookie('auth_token', $token, 60 * 24,'/', null, true, true, false, 'None'); // 24 hours
       //    $cookieUserData = cookie('user_data', $user, 60 * 24,'/', null, true, true, false, 'None'); // 24 hours
   
       //    return response()->json(['message' => 'Login successful','status'=>'1'], 200)
       //                     ->withCookie($cookieToken)
       //                     ->withCookie($cookieUserData);
   
           // Return the token and user info
           return response()->json([
               'user' => $techfood_user,
               'token'=>$token,
               'status'=>"1"
           ],200)->withCookie($cookieToken);

        }
    }
}
