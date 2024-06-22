<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignUpRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'username' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role'=> 'member'
        ]);

        $token = $user->createToken(name:'main')->plainTextToken;
        
        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        error_log(print_r($credentials,true));
        if (!Auth::attempt($credentials)){
            return response([
                'message'=>'Provided email address or password is incorrect'
            ]);
        }
        error_log("authenticated");
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken(name: 'main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }


    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response(content: '', status: 204);
    }
}
