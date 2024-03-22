<?php

namespace App\Http\Controllers;

use App\Http\Resources\KategorijaResource;
use App\Models\Kategorija;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KategorijaController extends Controller
{
    public function index()
    {
        $kategorije = Kategorija::all();
        return KategorijaResource::collection($kategorije);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $kategorija = Kategorija::create($validator->validated());

        return new KategorijaResource($kategorija);
    }

    public function show($id)
    {
        $kategorija = Kategorija::findOrFail($id);
        return new KategorijaResource($kategorija);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $kategorija = Kategorija::findOrFail($id);
        $kategorija->update($validator->validated());

        return new KategorijaResource($kategorija);
    }

    public function destroy($id)
    {
        $kategorija = Kategorija::findOrFail($id);
        $kategorija->delete();

        return response()->json(null, 204);
    }
}
