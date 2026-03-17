<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
                'role' => $request->role,
        ]);

        $token = JWTAuth::attempt([
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => JWTAuth::user(),
            'token' => $token,
        ], 200);
    }
    public function me()
    {
        return response()->json([
            'user' => JWTAuth::user(),
        ], 200);
    }

    public function logout()
    {
        JWTAuth::parseToken()->invalidate();

        return response()->json([
            'message' => 'Logout successful',
        ], 200);
    }
}
