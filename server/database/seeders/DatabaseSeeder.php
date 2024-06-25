<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Profile;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        Activity::factory(10)->create();

        // User::factory()->create([
        //     'userName' => 'Test',
        //     'userEmail' => 'test@example.com',
        //     'userPassword' =>  md5('123456'),
        //     'userRole' => 'admin',
        // ]);
    }
}
