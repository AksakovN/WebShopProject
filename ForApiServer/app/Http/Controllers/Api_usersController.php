<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Api_users;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Api_usersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $req)
    {
        $validatedData = $req->validate([
            'login' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:App\Models\Api_users,email',
            'password' => 'required|string|min:8',
        ]);
        $user = Api_users::create([
            'login' => $validatedData['login'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'phone_number' => $req->number,
            'fav_id' => 0,
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'login' => $user->login,
            'id' => $user->id,
        ]);
    }

    public function login(Request $req)
    {
        if (Auth::attempt($req->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $user = Api_users::where('email', $req->email)->firstOrFail();
        if (Hash::check($req->password, $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'login' => $user->login,
                'id' => $user->id,
            ]);
        } else {
            return response()->json([
                'error' => 'Wrong Password'
            ]);
        }
    }

    public function addToFav(Request $req){
        $curr_user = Api_users::find($req->user()->id);
        $curr_user->fav_id = $req->id;
        $curr_user->save();
    }

    public function me(Request $req){
        return $req->user()->fav_id;
    }

    public function logout(Request $req)
    {
        $req->user()->tokens()->delete();
    }
}
