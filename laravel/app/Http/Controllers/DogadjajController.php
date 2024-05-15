<?php

namespace App\Http\Controllers;

use App\Http\Resources\DogadjajResource;
use App\Models\Dogadjaj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;
class DogadjajController extends Controller
{
    public function index()  //prepravljena funkcija idex kako bi se obezbedila mogucnost kesiranja dogadjaja
    { 
        /* remember metoda pokušava da preuzme keširane podatke koristeći ključ 'dogadjaji_cache_key'. 
        Ako podaci nisu dostupni u kešu, izvršava se anonimna funkcija koja vraća sve događaje iz baze. 
        Rezultat ove funkcije se kešira na 60 minuta (60*60 sekundi). */
        $dogadjaji = Cache::remember('dogadjaji_cache_key', 60, function () {
             return Dogadjaj::where('user_id', auth()->id())->get();
        });
    
        return DogadjajResource::collection(Dogadjaj::where('user_id', auth()->id())->get());
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
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $user_id = Auth::id(); // Dobijanje ID trenutno ulogovanog korisnika
        $dogadjajData = array_merge($validator->validated(), ['user_id' => $user_id]);
        $dogadjaj = Dogadjaj::create($dogadjajData);
    
        Cache::forget('dogadjaji_cache_key');
    
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
            'vreme_od' => 'required|date_format:H:i:s',
            'vreme_do' => 'required|date_format:H:i:s|after:vreme_od',
            'naziv' => 'required|string|max:255',
            'opis' => 'string|nullable',
            'status' => 'required|in:zavrseno,odlozeno,otkazano,u_toku,zakazano',
            'kategorija_id' => 'required|exists:kategorijas,id',
            // 'user_id' => 'required|exists:users,id', // uklonjeno
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $dogadjaj = Dogadjaj::findOrFail($id);
        $validatedData = $validator->validated();
        $validatedData['user_id'] = Auth::id(); // Dodajemo ID trenutno ulogovanog korisnika
    
        $dogadjaj->update($validatedData);
        Cache::forget('dogadjaji_cache_key'); // nakon azuiranja brisanja i dodavanja dogadjaja cemo brisati kes memoriju kako bi se osvezila prilikom sledeceg ucitavanja podataka
    
        return new DogadjajResource($dogadjaj);
    }
    

    public function destroy($id)
    {
        $dogadjaj = Dogadjaj::findOrFail($id);
        $dogadjaj->delete();
        Cache::forget('dogadjaji_cache_key'); //nakon azuiranja brisanja i dodavanja dogadjaja cemo brisati kes memoriju kako bi se osvezila prilikom sledeceg ucitavanja podataka

        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $user_id = auth()->id();
        $query = Dogadjaj::where('user_id', $user_id);

        if ($request->filled('datum')) {
            $query->where('datum', $request->datum);
        }

        if ($request->filled('naziv')) {
            $query->where('naziv', 'like', '%' . $request->naziv . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('kategorija_id')) {
            $query->where('kategorija_id', $request->kategorija_id);
        }
        $dogadjaji = $query->get();

        return DogadjajResource::collection($dogadjaji);
    }

}
