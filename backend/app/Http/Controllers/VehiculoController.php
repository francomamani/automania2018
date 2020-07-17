<?php

namespace App\Http\Controllers;

use App\MySQLDump;
use App\SuministroCombustible;
use App\Vehiculo;

class VehiculoController extends Controller
{
    public function index()
    {
        return response()->json(Vehiculo::orderBy('id', 'desc')->get(), 200);
    }

    public function store()
    {
        $vehiculo = Vehiculo::create(request()->all());
        return response()->json([
            'creado' => $vehiculo,
            'mensaje' => 'Vehiculo registrado exitosamente. Desea ir al listado de vehiculos?',
            'has_action' => true
        ], 201);
    }

    public function show($id)
    {
        return response()->json(Vehiculo::find($id));
    }

    public function update($id)
    {
        $vehiculo = Vehiculo::find($id);
        $vehiculo->update(request()->all());
        return response()->json([
            'actualizado' => $vehiculo,
            'has_action' => true,
            'mensaje' => 'Vehiculo con placa ' . $vehiculo->placa . ' actualizado exitosamente'
        ], 200);
    }

    public function destroy($id)
    {
        $vehiculo = Vehiculo::find($id);
        $vehiculo->delete();
        return response()->json(['exito' => 'Vehiculo eliminado exitosamente con id: ' . $vehiculo->id], 200);
    }

    public function search()
    {
        $value = request()->input('value');
        $vehiculos = Vehiculo::where('placa', 'like', '%' . $value . '%')
            ->orWhere('marca', 'like', '%' . $value . '%')
            ->orWhere('modelo', 'like', '%' . $value . '%')
            ->orWhere('color', 'like', '%' . $value . '%')
            ->orWhere('cilindrada', 'like', '%' . $value . '%')
            ->orWhere('gestion', 'like', '%' . $value . '%')
            ->get();
        return response()->json($vehiculos, 201);
    }

    public function filtrar()
    {
        $status = request()->input('status');
        $response = null;
        switch ($status) {
            case 'placa-asc':
                $response = Vehiculo::orderBy('placa')->get();
                break;
            case 'placa-desc':
                $response = Vehiculo::orderByDesc('placa')->get();
                break;
            case 'cilindrada-asc':
                $response = Vehiculo::orderBy('cilindrada')->get();
                break;
            case 'cilindrada-desc':
                $response = Vehiculo::orderByDesc('cilindrada')->get();
                break;
            case 'activos':
                $response = Vehiculo::where('activo', true)->orderBy('placa')->get();
                break;
            case 'inactivos':
                $response = Vehiculo::where('activo', false)->orderBy('placa')->get();
                break;
        }
        return response()->json($response, 200);
    }

    public function suministroCombustibles($vehiculo_id)
    {
        $suministro_combustibles = SuministroCombustible::where('vehiculo_id', $vehiculo_id)->get();
        return response()->json($suministro_combustibles, 200);
    }
}
