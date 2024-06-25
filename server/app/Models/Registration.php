<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $primaryKey = 'registrationID';

    protected $fillable = [
        'userID',
        'activityID',
        'regDate',
    ];
    protected $casts = [
        'regDate' => 'datetime',
    ];
}

