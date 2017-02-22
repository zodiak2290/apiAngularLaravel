<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;

class ApiAuthController extends Controller
{
    //
    
    public function userAuth(Request $request){
    	
        $credentials = $request->only('email', 'password');
    	$token = null;
    	try{
    		if(!$token = JWTAuth::attempt($credentials)){ //utiliza el modelo de usuario para ocnsultar la base de datos 
    			return response()->json(['error' => 'invalid_credentials']);
    		}
    	}catch(JWTException $ex){
    		return response()->json(['error'=> 'something_went_wrong', 500]);
    	}

        $user = JWTAuth::toUser($token);

    	return response()->json(compact('token', 'user'));
    } 
}
