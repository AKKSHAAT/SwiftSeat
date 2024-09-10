<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Event;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seat>
 */
class SeatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_id' => Event::exists() ? Event::inRandomOrder()->first()->id : Event::factory(),
            'seat_number' => fake()->randomElement(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6']),
            'type' => fake()->randomElement(['VIP', 'Regular']),
            'price' => fake()->randomElement([100, 250]),
            'is_available' => fake()->randomElement([true, false]),
        ];
    }
}
