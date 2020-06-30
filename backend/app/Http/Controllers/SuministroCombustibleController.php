<?php

namespace App\Http\Controllers;

use App\SuministroCombustible;
use Illuminate\Http\Request;

class SuministroCombustibleController extends Controller
{
    public function index(){
        $lista = SuministroCombustible::all();
        return response()->json($lista, 200);
    }
    public function show($id){
        return response()->json(SuministroCombustible::find($id), 200);
    }
    public function store(){
        $suministroCombustible = SuministroCombustible::create(request()->all());
        return response()->json($suministroCombustible, 201);
    }
    public function update($id){
        $scombustible = SuministroCombustible::find($id);
        $scombustible->update(request()->all());
        return response()->json([
            'actualizado' => $scombustible,
            'has_action' => true,
            'mensaje' => 'Suminsitro actualizado exitosamente'
        ], 200);
    }
    public function destroy($id){
        $suministroCombustible = SuministroCombustible::find($id);
        $suministroCombustible->delete();
        return response()->json(['exito'=>'SuministroCombustible eliminado exitosamente con id: ' . $suministroCombustible->id], 200);
    }
    public function search(){
        $value = request()->input('value');
        $suministroCombustibles = SuministroCombustible::where('vehiculo_id', 'like', '%'.$value.'%')
            ->orWhere('combustible', 'like', '%'.$value. '%')->get();
        return response()->json($suministroCombustibles, 201);
    }
    public function filtrar(){
        $status = request()->input('status');
        $response = null;
        switch ($status){
            case 'placa-asc':  $response = SuministroCombustible::orderBy('vehiculo_id')->with('vehiculo_id')->get(); break;
            case 'placa-desc':  $response = SuministroCombustible::orderByDesc('vehiculo_id')->with('vehiculo_id')->get(); break;
            case 'combustible-asc':  $response = SuministroCombustible::orderBy('combustible')->with('kilometrajes')->get(); break;
            case 'combustible-desc':  $response = SuministroCombustible::orderByDesc('combustible')->with('kilometrajes')->get(); break;
            }
        return response()->json($response, 200);
    }
}