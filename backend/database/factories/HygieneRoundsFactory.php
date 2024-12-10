<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\HygieneRoundsLineTyes;
use App\Models\HygieneRoundsProducts;
use App\Models\HygieneRoundsSections;
use App\Models\HygieneRoundsLineTypes;
use App\Models\HygieneRoundsDangerTypes;
use App\Models\HygieneRoundsDeviationCodes;
use App\Models\HygieneRoundsDeviationTypes;
use App\Models\HygieneRoundsRiskCategories;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HygieneRounds>
 */
class HygieneRoundsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first();
        $deviation_type = HygieneRoundsDeviationTypes::inRandomOrder()->first();
        $deviation_code = HygieneRoundsDeviationCodes::inRandomOrder()->first();
        $danger = HygieneRoundsDangerTypes::inRandomOrder()->first();
        $type_of_products = HygieneRoundsProducts::inRandomOrder()->first();
        $line_types = HygieneRoundsLineTypes::inRandomOrder()->first();
        $section = HygieneRoundsSections::inRandomOrder()->first();
        $risk_category = HygieneRoundsRiskCategories::inRandomOrder()->first();

        return [
            'user_id'=> 1, //$user->id, //11
            'occurance_date'=> fake()->dateTimeBetween('-1year','now'),
            'deviation_type_id'=>$deviation_type->id,
            'deviation_code_id'=> $deviation_code->id,
            'product_id' => $type_of_products->id,
            'risk_category_id'=>$risk_category->id,
            'location_id'=> $line_types->id,
            'section_id'=> $section->id,
            'danger_id'=> $danger->id,
            'implemented_by'=> fake()->name(),
            'cleared_before'=>fake()->dateTimeBetween('now','+6months')
        ];
    }
}
