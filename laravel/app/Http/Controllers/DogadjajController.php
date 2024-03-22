<?php

namespace App\Http\Controllers;

use App\Http\Resources\DogadjajResource;
use App\Models\Dogadjaj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DogadjajController extends Controller
{
    public function index()
    {
        $dogadjaji = Dogadjaj::all();
        return DogadjajResource::collection($dogadjaji);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'datum' => 'required|date',
            'vreme_od' => 'required|date_format:H:i',
            'vreme_do' => 'required|date_format:H:i|after:vreme_od',
            'naziv' => 'required|string|max:255',
            'opis' => 'required|string',
            'status' => 'required|in:zavrseno,odlozeno,otkazano,u_toku,zakazano',
            'kategorija_id' => 'required|exists:kategorijas,id',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $dogadjaj = Dogadjaj::create($validator->validated());

        return new DogadjajResource($dogadjaj);
    }

    public function show($id)
    {
        $dogadjaj = Dogadjaj::findOrFail($id);
        return new DogadjajResource($dogadjaj);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'datum' => 'required|date',
            'vreme_od' => 'required|date_format:H:i',
            'vreme_do' => 'required|date_format:H:i|after:vreme_od',
            'naziv' => 'required|string|max:255',
            'opis' => 'string|nullable',
            'status' => 'required|in:zavrseno,odlozeno,otkazano,u_toku,zakazano',
            'kategorija_id' => 'required|exists:kategorijas,id',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $dogadjaj = Dogadjaj::findOrFail($id);
        $dogadjaj->update($validator->validated());

        return new DogadjajResource($dogadjaj);
    }

    public function destroy($id)
    {
        $dogadjaj = Dogadjaj::findOrFail($id);
        $dogadjaj->delete();

        return response()->json(null, 204);
    }
}
