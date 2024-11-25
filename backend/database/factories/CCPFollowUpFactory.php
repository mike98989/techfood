<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\DrillSampleAnimals;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CCPFollowUp>
 */
class CCPFollowUpFactory extends Factory
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
        $animal = DrillSampleAnimals::inRandomOrder()->first();
        $slaughter = fake()->randomElement(['yes', 'yes', 'yes', 'no']); /// I want to have multiple yes in ration of 3 to 1;
        $verify_or_monitored = fake()->randomElement(['1', '2']);
        $maxSum = rand(20,300); // The maximum allowed sum
        $columnsCount = 20; // Number of columns to fill
        $values = [];
        $remaining = $maxSum - rand(1,30);

        for ($i = 0; $i < $columnsCount; $i++) {
            // For the last column, use all remaining value
            $value = $i === $columnsCount - 1 
                ? $remaining 
                : $this->faker->numberBetween(0, $remaining);
            $values[] = $value;
            $remaining -= $value;
        }

        $totalSumInputed = array_sum(array_slice($values, 0, 8));
        $percent = ($totalSumInputed*1/$maxSum*1)*100;
        $clean = ($maxSum*1)*1 - ($totalSumInputed*1)*1;
        return [
            'user_id'=>1,//$user->id,
            'week' => fake()->numberBetween('1','52'),
            'slaughtered_total' => $maxSum,
            'date' => $date,
            'animal_id' => $animal->id,
            'slaughter' => $slaughter,
            'ham' => $slaughter === 'yes' ? $values[0] : 0,
            'front_leg' => $slaughter === 'yes' ? $values[9] : 0,
            'sternum' => $slaughter === 'yes' ? $values[1] : 0,
            'belly_cut' => $slaughter === 'yes' ? $values[2] : 0,
            'back' => $slaughter === 'yes' ? $values[3] : 0,
            'neck' => $slaughter === 'yes' ? $values[4] : 0,
            'flank' => $slaughter === 'yes' ? $values[5] : 0,
            'ribs' => $slaughter === 'yes' ? $values[6] : 0,
            'inside' => $slaughter === 'yes' ? $values[7] : 0,
            'hind_leg' => $slaughter === 'yes' ? $values[8] : 0,
            
            'verify_or_monitor'=>$verify_or_monitored,
            'total'=>$slaughter === 'yes' ?  $totalSumInputed : 0,
            'percent' => $slaughter === 'yes' ? $percent : 100,
            'clean' => $slaughter === 'yes' ? $clean : $maxSum,
        ];
    }
}
