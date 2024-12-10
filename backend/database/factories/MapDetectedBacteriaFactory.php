<?php

namespace Database\Factories;

use App\Models\MapDectedBacteriaCoordinates;
use App\Models\MapDetectedBacteriaCoordinates;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MapDetectedBacteriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
       

        $date = fake()->dateTimeBetween('-1year','now');
        $coordinate = MapDetectedBacteriaCoordinates::inRandomOrder()->first();
        $detected_values=[['label'=>fake()->randomElement(["Aeroba","Enterobacta",
        "Ecoli"]),'number_detected' => fake()->randomFloat(1,3,20)],['label'=>fake()->randomElement(["Aeroba","Enterobacta",
        "Ecoli"]),'number_detected' => fake()->randomFloat(1,3,20)],['label'=>fake()->randomElement(["Aeroba","Enterobacta",
        "Ecoli"]),'number_detected' => fake()->randomFloat(1,3,20)],['label'=>fake()->randomElement(["Aeroba","Enterobacta",
        "Ecoli"]),'number_detected' => fake()->randomFloat(1,3,20)]];
        return [
            'user_id'=>1,//$user->id,
            'date' => $date,
            'coordinate_id'=>$coordinate->id,
            'detected_values' => json_encode($detected_values),
            'status' => 1,
        ];
    }
}
