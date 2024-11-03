<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\AuthUserRequest;

class UserController extends Controller
{

    public function store(StoreUserRequest $request){
       // Create the user directly using validated data
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' =>Hash::make($request->password),
            ]);

            return response()->json([
                'message' =>'Account created successfully'
            ]);
       

    }

    public function auth(AuthUserRequest $request){

        // return dd($request,"auth");
            $user = User::whereEmail($request->email)->first();

            if(!$user || !Hash::check($request->password, $user->password)){
                return response()->json([
                    'error' =>'Credentials are not match'
                ]);
            }
            
            return response()->json([
                'user' =>$user,
                'message' =>'Logged In Successfully',
                'currentToken'=>$user->createToken('new_user')->plainTextToken,
                'token_type' => 'bearer',
            ]);

            
        
    }

    public function logout(Request $request){

        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message'=>'Logout successfully'
        ]);

    }
    
}


/**
 * 
 * In Laravel, when using FormRequest classes like StoreUserRequest, you don't need to call the validate() method manually.
 *  Instead, the validation is automatically performed when you inject the request class into the controller method.
 * 
 * if we use  if($request->validate()){ User::create([ 'name' => $request->name])}    . It gives error "Too few arguments to function "
 */