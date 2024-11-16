<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Fruits;
use App\Models\FruitProductionCauses;
use App\Models\FruitProductionDeviationTypes;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FruitProduction>
 */
class FruitProductionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first();
        $fruit = Fruits::inRandomOrder()->first();
        $causes = FruitProductionCauses::inRandomOrder()->first();
        $fruit_production_deviation_type = FruitProductionDeviationTypes::inRandomOrder()->first();
        $date = fake()->dateTimeBetween('-1year','now');
        $date = explode("-",$date->format('Y-m-d'));
        $date = implode("",$date);

        return [
        'user_id'=> 1, //$user->id, //11
        'date'=> $date,
        'section_id'=> $fruit->id,
        'status'=> rand(1,4),
        'cause_id'=> $causes->id,
        'deviation_type_id'=> $fruit_production_deviation_type->id,
        ];
    }
}
