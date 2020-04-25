<?php

namespace App\Http\Controllers;

use App\EstacionServicio;

class EstacionServicioController extends Controller
{
    public function index(){
        return response()->json(EstacionServicio::orderBy('razon_social', 'asc')->get(), 200);
    }
    public function show($id) {
        return response()->json(EstacionServicio::find($id));
    }
    public function store() {
        $estacion_servicio = EstacionServicio::create(request()->all());
        return response()->json([
            'creado' => $estacion_servicio,
            'mensaje' => 'Estacion de servicio ' . $estacion_servicio->razon_social . ' registrado exitosamente. '
                         . '¿Desea ir al listado de estaciones de servicio?',
            'has_action' => true
        ], 201);
    }
    public function update($id){
        $estacion_servicio = EstacionServicio::find($id);
        $estacion_servicio->update(request()->all());
        return response()->json([
            'actualizado' => $estacion_servicio,
            'mensaje' => 'Estacion de servicio ' . $estacion_servicio->razon_social . ' actualizado exitosamente.' .
                         ' ¿Desea ir al listado de estaciones de servicio?',
            'has_action' => true
        ] , 200);
    }
    public function destroy($id){
        $estacion_servicio = EstacionServicio::find($id);
        $estacion_servicio->delete();
        return response()->json(['exito'=>'Estacion de servicio eliminada exitosamente con id: ' . $estacion_servicio ->id], 200);
    }
}
