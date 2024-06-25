<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'username' => 'john_doe',
                'email' => 'john.doe@example.com',
                'password' => Hash::make('password123'),
                'role' => 'student',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'username' => 'jane_admin',
                'email' => 'jane.admin@example.com',
                'password' => Hash::make('adminpassword'),
                'role' => 'admin',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'username' => 'alice_student',
                'email' => 'alice.student@example.com',
                'password' => Hash::make('password456'),
                'role' => 'student',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'username' => 'bob_student',
                'email' => 'bob.student@example.com',
                'password' => Hash::make('password789'),
                'role' => 'student',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'username' => 'charlie_student',
                'email' => 'charlie.student@example.com',
                'password' => Hash::make('password101'),
                'role' => 'student',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'username' => 'dave_student',
                'email' => 'dave.student@example.com',
                'password' => Hash::make('password102'),
                'role' => 'student',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'username' => 'eve_student',
                'email' => 'eve.student@example.com',
                'password' => Hash::make('password103'),
                'role' => 'student',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'username' => 'frank_student',
                'email' => 'frank.student@example.com',
                'password' => Hash::make('password104'),
                'role' => 'student',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'username' => 'grace_student',
                'email' => 'grace.student@example.com',
                'password' => Hash::make('password105'),
                'role' => 'student',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'username' => 'hannah_student',
                'email' => 'hannah.student@example.com',
                'password' => Hash::make('password106'),
                'role' => 'student',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}

