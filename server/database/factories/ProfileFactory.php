<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'userID' => User    ::factory(),
            'firstName' => $this->faker->firstName(),
            'lastName' => $this->faker->lastName(),
            'matrikNumber' => $this->faker->unique()->word(),
            'academicYear' => $this->faker->word(),
            'phoneNumber' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'dateOfBirth' => $this->faker->dateTime(),
        ];
    }
}
