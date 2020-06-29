<?php

namespace App\Http\Controllers;

use App\ValeCombustible;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ValeCombustibleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return response()->json(ValeCombustible::orderByDesc('id')->get(), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        return response()->json(ValeCombustible::create($request->all()), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        return response()->json(ValeCombustible::find($id), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $valeGasolina = ValeCombustible::find($id);
        $valeGasolina->update($request->all());
        return response()->json($valeGasolina, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $valeGasolina = ValeCombustible::find($id);
        $valeGasolina->delete();
        return response()->json(['exito' => 'Vale de gasolina eliminado con id: ' . $valeGasolina], 200);
    }
}
