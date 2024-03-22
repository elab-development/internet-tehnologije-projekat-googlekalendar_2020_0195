<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kategorija>
 */
class KategorijaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $kategorije = ['posao', 'skola', 'fakultet', 'sport', 'selfcare', 'hobi', 'porodica', 'prijatelji', 'ostalo'];
        
        return [
            'naziv' => $this->faker->randomElement($kategorije),
        ];
    }
}
