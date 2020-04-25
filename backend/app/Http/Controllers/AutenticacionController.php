<?php

namespace App\Http\Controllers;

use App\Administrador;
use App\ServicioGeneral;
use App\User;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class AutenticacionController extends Controller
{
    public function authenticate(Request $request){
        $credenciales = $request->only('cuenta', 'password');
        $token = null;
        try{
            if (!$token = JWTAuth::attempt($credenciales)){
                return response()->json([
                    'autenticado' => false,
                    'mensaje' => 'Credenciales invalidas'
                ], 401);
            }
        }catch (JWTException $e){
            return response()->json([
                'error'=> 'can_not_create_token'
            ], 500);
        }
//        $user = JWTAuth::toUser($token);
        $user = User::where('cuenta', $request->input('cuenta'))->first();
        return response()->json([
            'autenticado' => true,
            'user_id' => $user->id,
            'token' => $token,
            'mensaje' => 'El usuario fue autenticado exitosamente'

        ], 200);
/*        return response()->json(compact('token', 'user'));*/
    }

    public function createUser(){
        $tipoUsuario = '';
        $data = [
            "cuenta" => request()->input('cuenta'),
            "password" => Hash::make(request()->input('password')),
            "nombres" => request()->input('nombres'),
            "apellidos" => request()->input('apellidos'),
            "carnet" => request()->input('carnet')
        ];
        $validator = Validator::make($data, [
            'cuenta' => 'required|unique:users',
            'carnet' => 'required|unique:users'
        ]);
        if (!$validator->fails()) {
            $user = User::create($data);
            switch (\request()->input('tipo_usuario')) {
                case 'administrador':
                    Administrador::create(['user_id' => $user->id]);
                    $tipoUsuario = 'administrador';
                    break;
                case 'servicio_general' :
                    ServicioGeneral::create(['user_id' => $user->id]);
                    $tipoUsuario = 'servicio general';
                    break;
            }
            return response()->json([
                'has_action' => true,
                'creado' => $user,
                'mensaje' => 'El usuario ' . $tipoUsuario .' ' .  $user->cuenta . ' fue registrado exitosamente. 
                ¿Desea ir al listado de usuarios?'
            ], 201);
        }
        return response()->json([
            'has_action' => false,
            'creado' => false,
            'mensaje' => 'Error: Ya existe una cuenta con los datos ingresados'
        ], 500);

  /*      $token = JWTAuth::fromUser($user);
        return response()->json(compact('token'), 201);*/
    }
    public function user($token){
        return response()->json(JWTAuth::toUser($token), 200);
    }
    public function index(){
        return response()->json(User::orderBy('cuenta')->with(['administrador', 'servicioGeneral'])->get(), 200);
    }
    public function show($id){
        return response()->json(User::find($id), 200);
    }
    public function destroy($id) {
        $user = User::find($id);
        $user->delete();
        return response()->json([
            'eliminado' => true,
            'mensaje' => 'El usuario ' . $user->cuenta . ' fue eliminado exitosamente'
        ], 200);
    }
    public function update($id){

        $validator = Validator::make(request()->all(), [
            'cuenta' => 'required|unique:users'
        ]);
        $user = User::find($id);
        if (!$validator->fails()) {
            $user->update(request()->all());
            return response()->json([
                'has_action' => true,
                'actualizado' => $user,
                'mensaje' => 'El usuario ' . $user->cuenta . ' fue actualizado exitosamente. ¿Desea volver al listado de usuarios?'
            ], 200);
        } else {
            if ($user->cuenta == request()->input('cuenta')) {
                $user->update(request()->all());
                return response()->json([
                    'has_action' => true,
                    'actualizado' => $user,
                    'mensaje' => 'El usuario ' . $user->cuenta . ' fue actualizado exitosamente. ¿Desea volver al listado de usuarios?'
                ], 200);
            } else {
                return response()->json([
                    'has_action' => false,
                    'actualizado' => false,
                    'mensaje' => 'Error: El usuario con cuenta ' . request()->input('cuenta'). ' ya existe en el sistema'
                ], 500);
            }
        }


    }
    public function logout(){
        $authorization = request()->header('Authorization');
        $segments = explode(" ", $authorization);

        JWTAuth::setToken($segments[1]);
        try{
            JWTAuth::invalidate();
            return response()->json([
                'deslogueo' => true,
                'mensaje' => 'Sesion cerrada exitosamente'
            ], 200);
        }catch (JWTException $e) {
            return response()->json([
                'deslogueo' => false,
                'mensaje' => 'Fallo el cierre de sesion, por favor intente de nuevo'
            ], 500);
        }
    }

    public function refreshToken($token){
        $token = JWTAuth::refresh($token);
        return response()->json(compact($token));
    }
    public function refreshTokenExpired() {
        $token = JWTAuth::refresh(request()->input('token'));
        return response()->json(compact($token));
    }
}
