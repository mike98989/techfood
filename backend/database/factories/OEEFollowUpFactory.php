<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OEEFollowUp>
 */
class OEEFollowUpFactory extends Factory
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
        $total_working_hours_daily = 480; // 8 hours * 40
        $number_of_planned_break = fake()->numberBetween(1,4);
        $number_of_meal_break = fake()->numberBetween(0,2);
        $default_planned_break_in_min=30;
        $default_meal_break_in_min=15;
        $down_time_in_min = fake()->numberBetween(10,120);
        $run_rate_in_ppm = fake()->numberBetween(190,200);
        $total_quality_piece = fake()->numberBetween(500,50000);
        $rejected_quality_piece = fake()->numberBetween(300,2000);
        $total_meal_break = $number_of_meal_break*$default_meal_break_in_min;
        $total_planned_break = $number_of_planned_break*$default_planned_break_in_min;
        $planned_production_time = $total_working_hours_daily - $total_meal_break - $total_planned_break;
        $operating_time = $planned_production_time - $down_time_in_min;
        $good_piece = $total_quality_piece - $rejected_quality_piece;
        $availability = $operating_time / $planned_production_time;
        $performance = $total_quality_piece / $operating_time / $run_rate_in_ppm;
        $quality = $good_piece/$total_quality_piece;
        $overall_oee = $availability * $performance * $quality;

        return [
            'user_id'=>1,//$user->id,
            'date' => $date,
            'number_of_planned_break'=>$number_of_planned_break,
            'default_planned_break_in_min'=>$default_planned_break_in_min,
            'number_of_meal_break'=>$number_of_meal_break,
            'default_meal_break_in_min'=>$default_meal_break_in_min,
            'down_time_in_min'=>$down_time_in_min,
            'run_rate_in_ppm'=>$run_rate_in_ppm,
            'total_quality_piece'=>$total_quality_piece,
            'rejected_piece'=>$rejected_quality_piece,
            'total_working_hours_daily'=>$total_working_hours_daily,
            'total_planned_break'=>$total_planned_break,
            'total_meal_break'=>$total_meal_break,
            'planned_production_time'=>$total_working_hours_daily - $total_meal_break,
            'operating_time' => $operating_time,
            'good_piece' =>$good_piece,
            'availability'=>number_format($availability*100,2),
            'performance'=>number_format($performance*100,2),
            'quality'=>number_format($quality*100,2),
            'overall_oee'=>number_format($overall_oee*100,2),
            
        ];
    }
}
