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
            'activityName' => $this->faker->activityName(),
            'description' => $this->faker->description(),
            'categoryTag' => $this->faker->categoryTag(),
            'startDate' => $this->faker->date(),
            'endDate' => $this->faker->date(),
            
            
        ];
    }
}
