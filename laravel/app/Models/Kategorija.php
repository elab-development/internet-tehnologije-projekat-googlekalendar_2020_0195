<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategorija extends Model
{
    use HasFactory;
    protected $fillable = ['naziv'];

  
    public function dogadjaji()
    {
        return $this->hasMany(Dogadjaj::class);
    }
}
