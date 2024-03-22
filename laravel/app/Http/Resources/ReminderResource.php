<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReminderResource extends JsonResource
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
            'reminder_time' => $this->reminder_time,
            'note' => $this->note,
            'dogadjaj' => new DogadjajResource($this->whenLoaded('dogadjaj')),
        ];
    }
}
