<?php

namespace App\Http\Controllers;

use App\AsignacionVehiculo;
use App\ServicioGeneral;

class AsignacionVehiculoController extends Controller
{
    public function index(){
        $asignaciones = AsignacionVehiculo::with(['chofer', 'vehiculo'])->orderBy('vehiculo_id', 'asc')->get();
        return response()->json($asignaciones, 200);
    }
    public function store(){
        $asignaciones = AsignacionVehiculo::where('chofer_id', request()->input('chofer_id'))
                          ->where('vehiculo_id', request()->input('vehiculo_id'))
                          ->count();
        if ($asignaciones == 0) {
            $servicio_general = ServicioGeneral::where('user_id', request()->input('user_id'))->first();
            $asignacion_vehiculo = new AsignacionVehiculo();
            $asignacion_vehiculo->chofer_id = request()->input('chofer_id');
            $asignacion_vehiculo->vehiculo_id = request()->input('vehiculo_id');
            $asignacion_vehiculo->servicio_general_id = $servicio_general->id;
            $asignacion_vehiculo->save();
            return response()->json([
                'creado' => $asignacion_vehiculo,
                'mensaje' => 'Se asigno correctamente el chofer al vehiculo',
                'has_action' => true
            ], 201);
        } else {
            return response()->json([
                'creado' => null,
                'mensaje' => 'Este chofer ya tiene asignado este vehiculo',
                'has_action' => true
            ], 201);
        }
    }
    public function update($id){
        $asignacion_vehiculo = AsignacionVehiculo::find($id);
        $asignacion_vehiculo->update(request()->all());
        return response()->json($asignacion_vehiculo , 200);
    }
    public function destroy($id){
        $asignacion_vehiculo = AsignacionVehiculo::find($id);
        $asignacion_vehiculo->delete();
        return response()->json(['exito'=>'Vehiculo eliminado exitosamente con id: ' . $asignacion_vehiculo ->id], 200);
    }
}
