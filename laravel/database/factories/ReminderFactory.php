<?php

namespace Database\Factories;

use App\Models\Dogadjaj;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reminder>
 */
class ReminderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'dogadjaj_id' => Dogadjaj::query()->inRandomOrder()->first()->id, // Nasumično odabira postojeći događaj
            'reminder_time' => $this->faker->dateTimeBetween('-1 month', '+1 month'), // Generiše datum/vreme između prošlog i narednog meseca
            'note' => $this->faker->sentence(), // Generiše nasumičnu rečenicu kao napomenu
        ];
    }
}
