<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'activityName',
        'description',
        'venue',
        'startDateTime',
        'endDateTime',
        'maxParticipants',
    ];
}

