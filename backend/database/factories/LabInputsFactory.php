<?php

namespace Database\Factories;

use App\Models\User;
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
        $user = User::inRandomOrder()->first();
        $date = fake()->dateTimeBetween('-1year','now');
        $date = explode("-",$date->format('Y-m-d'));
        $date = implode("",$date);
        $final_date = substr($date,2);
        $rand=rand(100,10000);
        
        return [
            'user_id'=>1,//$user->id,
            'PO_number' => fake()->unique()->numberBetween('400','800'),
            'batch_number' => $final_date.":".$rand,
            'protein_value' => fake()->optional->numberBetween(30,90),
            'lactose_value' => fake()->optional->numberBetween(8,22),
            'water_value' => fake()->optional->numberBetween(3,15),
            'result_date' => $date, 
        ];
    }
}
