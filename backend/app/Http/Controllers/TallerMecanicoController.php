<?php

namespace App\Http\Controllers;

use App\TallerMecanico;
use Illuminate\Http\Request;

class TallerMecanicoController extends Controller
{
    public function index()
    {
        return response()->json(TallerMecanico::orderBy('id', 'desc')->get(), 200);
    }
    public function store(Request $request)
    {
        $taller_mecanico = TallerMecanico::create($request->all());
        return response()->json([
            'creado' => $taller_mecanico,
            'mensaje' => $taller_mecanico->nombre . ' creado exitosamente',
            'has_action' => true
        ], 201);
    }
    public function show($id)
    {
        return response()->json(TallerMecanico::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $taller_mecanico = TallerMecanico::find($id);
        $taller_mecanico->update($request->all());
        return response()->json([
            'actualizado' => $taller_mecanico,
            'has_action' => true,
            'mensaje' => 'El taller ' . $taller_mecanico->nombre . ' fue actualizado exitosamente. ¿Desea volver al listado de talleres mecánicos?',
        ], 200);
    }

    public function destroy($id)
    {
        $taller_mecanico = TallerMecanico::find($id);
        $taller_mecanico->delete();
        return response()->json('Taller mecanico eliminado con id: '.$taller_mecanico->id, 200);
    }
}
