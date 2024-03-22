<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DogadjajResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'datum' => $this->datum,
            'vreme_od' => $this->vreme_od,
            'vreme_do' => $this->vreme_do,
            'naziv' => $this->naziv,
            'opis' => $this->opis,
            'status' => $this->status,
            'user' => new UserResource($this->whenLoaded('user')),
            'kategorija' => new KategorijaResource($this->whenLoaded('kategorija')),
        ];
    }
}
