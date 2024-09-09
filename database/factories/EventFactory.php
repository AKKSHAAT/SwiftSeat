<?php

namespace Database\Factories;

use Faker\Core\DateTime;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->colorName(),
            'day' => fake()->dayOfWeek(),
            'date' => now(),
            'location' => fake()->randomElement(['DDN', 'DEl', 'GOA', 'PNQ']),
            'user_id' => 1,   //or User::Factory
            'photo' => fake()->imageUrl()
        ];
    }
}
