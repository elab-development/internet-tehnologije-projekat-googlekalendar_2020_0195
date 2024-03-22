<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Dogadjaj;
use App\Models\Kategorija;
use App\Models\Reminder;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

         // Kreiranje specifičnih korisnika
         User::create([
            'name' => 'Jana',
            'email' => 'jana@gmail.com',
            'password' => bcrypt('jana'), // Enkriptovanje lozinke
        ]);

        User::create([
            'name' => 'Aleksandra',
            'email' => 'aleksandra@gmail.com',
            'password' => bcrypt('aleksandra'), // Enkriptovanje lozinke
        ]);

        // Kreiranje dodatnih 5 random korisnika
        User::factory()->count(5)->create();

        // Kreiranje 5 kategorija
        $kategorije = ['Posao', 'Škola', 'Fakultet', 'Sport', 'Self-care'];
        foreach ($kategorije as $kategorija) {
            Kategorija::create([
                'naziv' => $kategorija,
            ]);
        }

        // Kreiranje 10 događaja za svakog korisnika
        User::all()->each(function ($user) {
            Dogadjaj::factory()->count(10)->create([
                'user_id' => $user->id,
                'kategorija_id' => Kategorija::inRandomOrder()->first()->id, // Dodaje random kategoriju svakom događaju
            ]);
        });

        // Kreiranje 5 random podsetnika
        Dogadjaj::all()->each(function ($dogadjaj) {
            Reminder::factory()->count(5)->create([
                'dogadjaj_id' => $dogadjaj->id,
            ]);
        });
    }
  
}
