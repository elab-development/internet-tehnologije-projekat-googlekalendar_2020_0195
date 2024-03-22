<?php

namespace Database\Factories;

use App\Models\Kategorija;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dogadjaj>
 */
class DogadjajFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $statusi = ['zavrseno', 'odlozeno', 'otkazano', 'u_toku', 'zakazano'];

        return [
            'datum' => $this->faker->date(),
            'vreme_od' => $this->faker->time(),
            'vreme_do' => $this->faker->time(),
            'naziv' => $this->faker->sentence(),
            'opis' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement($statusi),
            'kategorija_id' => Kategorija::query()->inRandomOrder()->first()->id,
            'user_id' => User::query()->inRandomOrder()->first()->id,
        ];
    }
}
