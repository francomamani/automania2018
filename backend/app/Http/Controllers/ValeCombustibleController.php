<?php

namespace App\Http\Controllers;


use App\Kilometraje;
use App\ValeCombustible;
use Carbon\Carbon;

class ValeCombustibleController extends Controller
{
    public function index()
    {
        return response()->json(ValeCombustible::orderBy('id', 'desc')->get(), 200);
    }

    public function store()
    {
        $input = request()->all();
        if ($input['kilometraje_anterior_id'] !== 0) {
            $kilometrajeAnterior = Kilometraje::find($input['kilometraje_anterior_id']);
            $kilometraje = Kilometraje::create([
                'suministro_combustible_id' => $input['suministro_combustible_id'],
                'anterior' => $kilometrajeAnterior['actual'],
                'actual' => $input['kilometraje'],
                'recorrido' => $input['kilometraje'] - $kilometrajeAnterior->actual
            ]);
        } else {
            $kilometraje = Kilometraje::create([
                'suministro_combustible_id' => $input['suministro_combustible_id'],
                'anterior' => $input['kilometraje_anterior'],
                'actual' => $input['kilometraje'],
                'recorrido' => $input['kilometraje_anterior'] - $input['kilometraje']
            ]);
        }

        $vales = ValeCombustible::whereYear('created_at', Carbon::now()->year)
            ->where('asignacion_vehiculo_id', $input['asignacion_vehiculo_id'])
            ->count();
        if ($vales > 0) {
            $valeCombustible = ValeCombustible::create([
                'kilometraje_id' => $kilometraje->id,
                'asignacion_vehiculo_id' => $input['asignacion_vehiculo_id'],
                'estacion_servicio_id' => $input['estacion_servicio_id'],
                'numero_vale' => $vales + 1 . '/' . Carbon::now()->year,
                'motivo_viaje' => $input['motivo_viaje'],
                'litros' => $input['litros'],
                'importe' => $input['importe'],
            ]);
            return response()->json([
                'creado' => $valeCombustible,
                'mensaje' => 'Vale de combustible creado exitosamente. Desea ir al listado de vales de combustible?',
                'has_action' => true
            ], 201);
        } else {
            $valeCombustible = ValeCombustible::create([
                'kilometraje_id' => $kilometraje->id,
                'asignacion_vehiculo_id' => $input['asignacion_vehiculo_id'],
                'estacion_servicio_id' => $input['estacion_servicio_id'],
                'numero_vale' => 1,
                'motivo_viaje' => $input['motivo_viaje'],
                'litros' => $input['litros'],
                'importe' => $input['importe'],
            ]);
            return response()->json([
                'creado' => $valeCombustible,
                'mensaje' => 'Vale de combustible creado exitosamente. Desea ir al listado de vales de combustible?',
                'has_action' => true
            ], 201);
        }
    }

    public function search()
    {
        $value = request()->input('value');
        $vales = ValeCombustible::orWhere('numero_vale', 'like', '%' . $value . '%')
            ->orWhere('motivo_viaje', 'like', '%' . $value . '%')
            ->get();
        return response()->json($vales, 201);

    }

    public function show($id)
    {
        return response()->json(ValeCombustible::find($id), 200);
    }

    public function update($id)
    {
        $valeGasolina = ValeCombustible::find($id);
        $valeGasolina->update(request()->all());
        return response()->json($valeGasolina, 200);
    }

    public function destroy($id)
    {
        $valeGasolina = ValeCombustible::find($id);
        $valeGasolina->delete();
        return response()->json(['exito' => 'Vale de gasolina eliminado con id: ' . $valeGasolina], 200);
    }
}
