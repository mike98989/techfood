<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class LabInputsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = fake()->dateTimeBetween('-1year','now');
        $date = explode("-",$date->format('Y-m-d'));
        $date = implode("",$date);
        $final_date = substr($date,2);
        $rand=rand(100,10000);
        return [
            'PO_number' => fake()->unique()->numberBetween('400','800'),
            'batch_number' => $final_date.":".$rand,
            'protein_value' => fake()->numberBetween(30,90),
            'lactose_value' => fake()->numberBetween(25,97),
            'water_value' => fake()->numberBetween(25,97),
            'result_date' => $date,
        ];
    }
}
