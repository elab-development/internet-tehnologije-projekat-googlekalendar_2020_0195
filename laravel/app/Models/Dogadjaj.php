<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dogadjaj extends Model
{
    use HasFactory;
    protected $fillable = [
        'datum', 'vreme_od', 'vreme_do', 'naziv', 'opis', 'status', 'kategorija_id','user_id'
    ];

    // Odnos sa User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Odnos sa Kategorija
    public function kategorija()
    {
        return $this->belongsTo(Kategorija::class);
    }

    // Odnos sa Reminder
    public function reminders()
    {
        return $this->hasMany(Reminder::class);
    }
}
