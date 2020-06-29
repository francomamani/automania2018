<?php

namespace App\Http\Controllers;

use App\Chofer;
use App\Contrato;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ContratoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
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
        $contrato = Contrato::create($request->all());
        return response()->json($contrato, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Contrato $contrato
     * @return Response
     */
    public function show(Contrato $contrato)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Contrato $contrato
     * @return Response
     */
    public function edit(Contrato $contrato)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Contrato $contrato
     * @return Response
     */
    public function update(Request $request, Contrato $contrato)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Contrato $contrato
     * @return Response
     */
    public function destroy(Contrato $contrato)
    {
        //
    }
}
