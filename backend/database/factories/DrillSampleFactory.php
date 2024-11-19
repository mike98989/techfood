<?php

namespace Database\Factories;
use Carbon\Carbon;
use App\Models\User;
use App\Models\DrillSampleAnimals;
use App\Models\DrillSampleProducts;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DrillSample>
 */
class DrillSampleFactory extends Factory
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
        $pieces_date = Carbon::instance($date)->addDay();

        // $date = implode("",$date);
        $animal = DrillSampleAnimals::inRandomOrder()->first();
        $product = DrillSampleProducts::inRandomOrder()->first();
        $rand=rand(100,10000);
        
        return [
            'user_id'=>1,//$user->id,
            'week' => fake()->numberBetween('1','20'),
            'slaughter_number' => rand(1000,10000),
            'slaughter_date' => $date,
            'slaughter_house' => fake()->numberBetween('1','200'),
            'product_id' => $product->id,
            'animal_id' => $animal->id,
            'pieces_date' => $pieces_date,
            'aerobic' => fake()->randomFloat(1, 1, 8),
            'enterobacta' => fake()->randomFloat(1, 0, 3),
            
        ];
    }
}
