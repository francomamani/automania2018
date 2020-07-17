<?php

namespace App\Http\Controllers;

use App\Combustible;
use App\SuministroCombustible;
use Illuminate\Http\Request;

class CombustibleController extends Controller
{


    public function index()
    {
        $combustibles = Combustible::orderBy('nombre', 'asc')->get();
        return response()->json($combustibles, 200);
    }

    public function show($id)
    {
        return response()->json(Combustible::find($id), 200);
    }

    public function store(Request $request)
    {
        $tipoComb = Combustible::create($request->all());
        return response()->json([
            'creado' => $tipoComb,
            'mensaje' => $tipoComb->nombres . ' ' . $tipoComb->apellidos .
                'creado exitosamente. Desea ir al listados de tipos de combustible?',
            'has_action' => true
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $tipoCom = Combustible::find($id);
        $tipoCom->update($request->all());
        return response()->json([
            'actualizado' => $tipoCom,
            'mensaje' => $tipoCom->nombres . ' ' . $tipoCom->apellidos
                . ' actualizado exitosamente. Desea volver a la lista de tipos de combustibles?',
            'has_action' => true
        ], 200);
    }

    public function destroy($id)
    {
        $tipoCombustible = Combustible::find($id);
        $tipoCombustible->delete();
        return response()->json(['exito' => 'Tipo combustible eliminado exitosamente con id: ' . $tipoCombustible->id], 200);
    }

    public function search()
    {
        $value = request()->input('value');
        $tipoCombustible = Combustible::where('nombre', 'like', '%' . $value . '%')
            ->orWhere('importe', 'like', '%' . $value . '%')->get();
        return response()->json($tipoCombustible, 201);
    }

    public function filtrar()
    {
        $status = request()->input('status');
        $response = null;
        switch ($status) {
            case 'nombre-asc':
                $response = Combustible::orderBy('nombre')->with('nombre')->get();
                break;
            case 'nombre-desc':
                $response = Combustible::orderByDesc('nombre')->with('nombre')->get();
                break;
            case 'importe-asc':
                $response = Combustible::orderBy('importe')->with('importe')->get();
                break;
            case 'importe-desc':
                $response = Combustible::orderByDesc('importe')->with('importe')->get();
                break;
        }
        return response()->json($response, 200);
    }

    public function lastCombustible($suministro_combustible_id)
    {
        $suministro = SuministroCombustible::find($suministro_combustible_id);
        return Combustible::where('nombre', $suministro->combustible)->orderBy('id', 'desc')->first();
    }
}
