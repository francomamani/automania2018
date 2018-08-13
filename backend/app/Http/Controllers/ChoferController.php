<?php

namespace App\Http\Controllers;

use App\Chofer;
use Illuminate\Http\Request;

class ChoferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Chofer::orderBy('nombres', 'asc')->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $chofer =  Chofer::create($request->all());
        return response()->json([
            'creado' => $chofer,
            'mensaje' => $chofer->nombres .' '. $chofer->apellidos .
                         'creado exitosamente. Desea ir al listados de choferes?',
            'has_action' => true
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Chofer::find($id), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $chofer = Chofer::find($id);
        $chofer->update($request->all());
        return response()->json([
            'actualizado' => $chofer,
            'mensaje' => $chofer->nombres . ' ' . $chofer->apellidos
                        . ' actualizado exitosamente. Desea volver a la lista de choferes?',
            'has_action' => true
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $chofer = Chofer::find($id);
        $chofer->delete();
        return response()->json(['exito'=>'Chofer eliminado con id: ' . $chofer]);
    }
    public function search(){
        $value = request()->input('value');
        $choferes = Chofer::where('nombres', 'like', '%'.$value.'%')
                          ->orWhere('apellidos', 'like', '%'.$value. '%')
                          ->orWhere('carnet', 'like', '%'.$value. '%')
                          ->orWhere('tipo', 'like', '%'.$value. '%')
                          ->get();
        return response()->json($choferes, 201);
    }
    public function filtrar(){
        $status = request()->input('status');
        $response = null;
        switch ($status){
            case 'nombres-asc':  $response = Chofer::orderBy('nombres')->get(); break;
            case 'nombres-desc':  $response = Chofer::orderByDesc('nombres')->get(); break;
            case 'activos':  $response = Chofer::where('activo', true)->orderBy('nombres')->get(); break;
            case 'inactivos':  $response = Chofer::where('activo', false)->orderBy('nombres')->get(); break;
            case 'permanentes':  $response = Chofer::where('tipo', 'permanente')->orderBy('nombres')->get(); break;
            case 'eventuales':  $response = Chofer::where('tipo', 'eventual')->orderBy('nombres')->get(); break;
        }
        return response()->json($response, 200);
    }
}
