<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Registration>
 */
class RegistrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'activityID' => \App\Models\Activity::factory(),
            'userID' => \App\Models\User::factory(),
            'regDate' => $this->faker->dateTimeThisDecade(),
        ];
    }
}
