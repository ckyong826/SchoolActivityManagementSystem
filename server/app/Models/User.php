<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasAttributes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    protected $primaryKey = 'userID';
    public function registrations(){
        return $this->hasMany(Registration::class);
    }

    public function profile (){
        return $this->hasOne(Profile::class);
    }

    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
    ];

    public function activities()
    {
        return $this->belongsToMany(Activity::class, 'registrations', 'userID', 'activityID')
                    ->withTimestamps()
                    ->withPivot('regDate');
    }
}
