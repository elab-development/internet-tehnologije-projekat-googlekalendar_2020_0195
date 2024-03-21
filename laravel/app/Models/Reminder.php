<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reminder extends Model
{
    use HasFactory;
    protected $fillable = [
        'dogadjaj_id', 'reminder_time', 'note'
    ];

     
    public function dogadjaj()
    {
        return $this->belongsTo(Dogadjaj::class);
    }
}
