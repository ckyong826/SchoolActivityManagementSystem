<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'activityName' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'venue' => $this->faker->address(),
            'startDateTime' => $this->faker->dateTimeBetween('now', '+1 week'),
            'endDateTime' => $this->faker->dateTimeBetween('+1 week', '+2 weeks'),
            'maxParticipants' => $this->faker->numberBetween(1, 100),
        ];
    }
}
