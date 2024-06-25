<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $primaryKey = 'activityID';

    protected $fillable = [
        'activityName',
        'description',
        'venue',
        'category',
        'startDateTime',
        'endDateTime',
        'maxParticipants',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'registrations', 'activityID', 'userID')
                    ->withTimestamps()
                    ->withPivot('regDate');
    }
}

