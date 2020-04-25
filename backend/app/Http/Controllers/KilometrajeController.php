<?php

namespace App\Http\Controllers;

use App\Kilometraje;
use App\Vehiculo;

class KilometrajeController extends Controller
{
    public function index(){
        $lista = Vehiculo::with('kilometrajes')->get();
        return response()->json($lista, 200);
    }
    public function show($id){
        return response()->json(Kilometraje::find($id), 200);
    }
    public function store(){
        $kilometraje = Kilometraje::create(request()->all());
        return response()->json($kilometraje, 201);
    }
    public function update($id){
        $kilometraje = Kilometraje::find($id);
        $kilometraje->update(request()->all());
        return response()->json($kilometraje, 200);
    }
    public function destroy($id){
        $kilometraje = Kilometraje::find($id);
        $kilometraje->delete();
        return response()->json(['exito'=>'Kilometraje eliminado exitosamente con id: ' . $kilometraje->id], 200);
    }
    public function search(){
        $value = request()->input('value');
        $vehiculos = Vehiculo::where('placa', 'like', '%'.$value.'%')
            ->orWhere('marca', 'like', '%'.$value. '%')
            ->orWhere('modelo', 'like', '%'.$value. '%')
            ->orWhere('color', 'like', '%'.$value. '%')
            ->orWhere('cilindrada', 'like', '%'.$value. '%')
            ->orWhere('gestion', 'like', '%'.$value. '%')
            ->with('kilometrajes')->get();
        return response()->json($vehiculos, 201);
    }
    public function filtrar(){
        $status = request()->input('status');
        $response = null;
        switch ($status){
            case 'placa-asc':  $response = Vehiculo::orderBy('placa')->with('kilometrajes')->get(); break;
            case 'placa-desc':  $response = Vehiculo::orderByDesc('placa')->with('kilometrajes')->get(); break;
            case 'cilindrada-asc':  $response = Vehiculo::orderBy('cilindrada')->with('kilometrajes')->get(); break;
            case 'cilindrada-desc':  $response = Vehiculo::orderByDesc('cilindrada')->with('kilometrajes')->get(); break;
            case 'activos':  $response = Vehiculo::where('activo', true)->orderBy('placa')->with('kilometrajes')->get(); break;
            case 'inactivos':  $response = Vehiculo::where('activo', false)->orderBy('placa')->with('kilometrajes')->get(); break;
        }
        return response()->json($response, 200);
    }
}
