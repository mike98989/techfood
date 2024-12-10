<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MapDetectedBacteriaCoordinatesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $label = fake()->randomElement(["Aeroba","Enterobacta",
        "Ecoli"]);
        $date = fake()->dateTimeBetween('-1year','now');
        $data=[['label' => fake()->randomElement(["Aeroba","Enterobacta",
        "Ecoli"]),'x_axis' => fake()->randomFloat(1,0,10), 'y_axis' => fake()->randomFloat(1,0,10)],['label' => fake()->randomElement(["Aeroba","Enterobacta",
        "Ecoli"]),'x_axis' => fake()->randomFloat(1,0,10), 'y_axis' => fake()->randomFloat(1,0,10)],['label' => fake()->randomElement(["Aeroba","Enterobacta",
        "Ecoli"]), 'x_axis' => fake()->randomFloat(1,0,10), 'y_axis' => fake()->randomFloat(1,0,10)],['label' => fake()->randomElement(["Aeroba","Enterobacta",
        "Ecoli"]), 'x_axis' => fake()->randomFloat(1,0,10), 'y_axis' => fake()->randomFloat(1,0,10)]];
        

        return [
            'user_id'=>1,//$user->id,
            'coordinates'=>json_encode($data),
            'type'=>fake()->randomElement(["map","map","spread"]),
            'image_path_id' => 1,
            'title'=>fake()->sentence(3),
            'status' => 1,
        ];
    }
}
