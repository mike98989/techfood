<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StaffingProduction>
 */
class StaffingProductionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first();
        $day = fake()->randomElement(['monday', 'tuesday', 'wednesday', 'thursday','friday','saturday','sunday']); 
        $hours_worked=40;
        $hours_cleaned=15;
        $supervisor = fake()->numberBetween('1','3');
        $quality_control = fake()->numberBetween('1','3');
        $operator_staff = fake()->numberBetween('1','6');
        $total_hours = $hours_worked*($supervisor+$quality_control+$operator_staff);
        $production_quantity = fake()->numberBetween('1000','3000');
        return [
            'user_id'=>1,//$user->id,
            'day' => $day,
            'week' => fake()->numberBetween('1','52'),
            'year' => "2024",
            'weekly_total_hours_worked' => $hours_worked,
            'weekly_total_hours_cleaned' => $hours_cleaned,
            'supervisor' => $supervisor,
            'quality_control' => $quality_control,
            'operator_staff' => $operator_staff,
            'total_hours' => $total_hours,
            'production_quantity'=>$production_quantity,
        ];
    }
}
