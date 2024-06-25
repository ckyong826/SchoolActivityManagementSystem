<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $primaryKey = 'registrationID';

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function activity(){
        return $this->belongsTo(Activity::class);
    }
    protected $fillable = [
        'userID',
        'activityID',
        'regDate',
    ];
    protected $casts = [
        'regDate' => 'datetime',
    ];
}

