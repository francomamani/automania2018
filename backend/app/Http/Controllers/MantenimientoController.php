<?php

namespace App\Http\Controllers;

use App\Mantenimiento;

class MantenimientoController extends Controller
{
    public function index(){
        return response()->json(Mantenimiento::orderBy('id', 'desc')->get(), 200);
    }
    public function store(){
/*        $mantenimiento = new Mantenimiento();
        $mantenimiento->*/
        $mantenimiento = Mantenimiento::create(request()->all());
        return response()->json($mantenimiento , 201);
    }
    public function update($id){
        $mantenimiento = Mantenimiento::find($id);
        $mantenimiento->update(request()->all());
        return response()->json($mantenimiento , 200);
    }
    public function destroy($id){
        $mantenimiento = Mantenimiento::find($id);
        $mantenimiento->delete();
        return response()->json(['exito'=>'Mantenimiento eliminado exitosamente con id: ' . $mantenimiento ->id], 200);
    }
}
