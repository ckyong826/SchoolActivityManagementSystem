<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $primaryKey = 'registrationID';

    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class, 'activityID');
    }

    protected $casts = [
        'regDate' => 'datetime',
    ];

    protected $fillable = [
        'userID',
        'activityID',
        'regDate',
    ];
}


