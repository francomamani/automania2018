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
        return response()->json(Contrato::orderBy('id', 'desc')->get(), 200);
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
        return response()->json(Contrato::find($id));
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
        $contrato = Contrato::find($id);
        $contrato->update(request()->all());
        return response()->json([
            'actualizado' => $contrato,
            'has_action' => true,
            'mensaje' => 'Numero_contrato' . $contrato->numero_contrato . ' actualizado exitosamente'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Contrato $contrato
     * @return Response
     */
    public function destroy(Contrato $contrato)
    {
        $contrato = Contrato::find($id);
        $contrato->delete();
        return response()->json(['exito'=>'Contrato eliminado exitosamente con id: ' . $contrato->id], 200);
    }

    public function search(){
        $value = request()->input('value');
        $contrato = Contrato::where('numero_contrato', 'like', '%'.$value.'%')
            ->orWhere('fecha_inicio_contrato', 'like', '%'.$value. '%')
            ->orWhere('fecha_fin_contrato', 'like', '%'.$value. '%')
            ->orWhere('activo', 'like', '%'.$value. '%')
            ->get();
        return response()->json($contrato, 201);
    }

    public function filtrar(){
        $status = request()->input('status');
        $response = null;
        switch ($status){
            case 'chofer-asc':  $response = Contrato::orderBy('chofer_id ')->get(); break;
            case 'chofer-desc':  $response = Contrato::orderByDesc('chofer_id ')->get(); break;
            case 'numero-asc':  $response = Contrato::orderBy('numero_contrato')->get(); break;
            case 'numero-desc':  $response = Contrato::orderByDesc('numero_contrato')->get(); break;
        }
        return response()->json($response, 200);
    }
}
