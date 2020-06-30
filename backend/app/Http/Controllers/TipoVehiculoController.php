<?php

namespace App\Http\Controllers;

use App\TipoVehiculo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TipoVehiculoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $tipos = TipoVehiculo::orderBy('descripcion')->get();
        return response()->json($tipos, 200);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param TipoVehiculo $tipoVehiculo
     * @return Response
     */
    public function show(TipoVehiculo $tipoVehiculo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param TipoVehiculo $tipoVehiculo
     * @return Response
     */
    public function edit(TipoVehiculo $tipoVehiculo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param TipoVehiculo $tipoVehiculo
     * @return Response
     */
    public function update(Request $request, TipoVehiculo $tipoVehiculo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param TipoVehiculo $tipoVehiculo
     * @return Response
     */
    public function destroy(TipoVehiculo $tipoVehiculo)
    {
        //
    }
}
