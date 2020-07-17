<?php

namespace App\Http\Controllers;

use App\Kilometraje;

class KilometrajeController extends Controller
{
    public function index()
    {
        $lista = Kilometraje::all();
        return response()->json($lista, 200);
    }

    public function show($id)
    {
        return response()->json(Kilometraje::find($id), 200);
    }

    public function store()
    {
        $kilometraje = Kilometraje::create(request()->all());
        return response()->json($kilometraje, 201);
    }

    public function update($id)
    {
        $kilometraje = Kilometraje::find($id);
        $kilometraje->update(request()->all());
        return response()->json($kilometraje, 200);
    }

    public function destroy($id)
    {
        $kilometraje = Kilometraje::find($id);
        $kilometraje->delete();
        return response()->json(['exito' => 'Kilometraje eliminado exitosamente con id: ' . $kilometraje->id], 200);
    }

    public function search()
    {
        $value = request()->input('value');
        $km = Kilometraje::where('anterior', 'like', '%' . $value . '%')
            ->orWhere('actual', 'like', '%' . $value . '%')
            ->orWhere('recorrido', 'like', '%' . $value . '%')->get();
        return response()->json($km, 201);
    }

    public function filtrar()
    {
        $status = request()->input('status');
        $response = null;
        switch ($status) {
            case 'anterior-asc':
                $response = Kilometraje::orderBy('anterior')->with('anterior')->get();
                break;
            case 'anterior-desc':
                $response = Kilometraje::orderByDesc('anterior')->with('anterior')->get();
                break;
            case 'actual-asc':
                $response = Kilometraje::orderBy('actual')->with('actual')->get();
                break;
            case 'actual-desc':
                $response = Kilometraje::orderByDesc('actual')->with('actual')->get();
                break;
        }
        return response()->json($response, 200);
    }

    public function getKilometraje($suministro_combustible_id)
    {
        $kilometrajeExists = Kilometraje::where('suministro_combustible_id', $suministro_combustible_id)->exists();
        if ($kilometrajeExists) {
            $kilometraje = Kilometraje::where('suministro_combustible_id', $suministro_combustible_id)
                ->orderBy('id', 'desc')
                ->first();
            return response()->json($kilometraje, 200);
        } else {
            return response()->json([
                'suministro_combustible_id' => 0,
                'anterior' => 0,
                'actual' => 0,
                'recorrido' => 0,
                'id' => 0
            ], 200);
        }
    }
}
