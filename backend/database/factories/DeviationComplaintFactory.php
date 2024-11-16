<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\DeviationComplaintSections;
use App\Models\DeviationComplaintLineTypes;
use App\Models\DeviationComplaintRemarkTypes;
use App\Models\DeviationComplaintProductTypes;
use App\Models\DeviationComplaintDeviationTypes;
use App\Models\DeviationComplaintRiskCategories;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DeviationComplaint>
 */
class DeviationComplaintFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title_example = [
            "Wrong Packaging",
            "Incorrect Labeling",
            "Broken Seal",
            "Damaged Product",
            "Product Contamination",
            "Foreign Object in Product",
            "Incomplete Delivery",
            "Wrong Item Delivered",
            "Production Equipment Failure",
            "Missing Documentation",
            "Quality Check Failure",
            "Exceeded Safety Limits",
            "Delayed Shipment",
            "Wrong Batch Number",
            "Misaligned Printing",
            "Expired Product",
            "Incorrect Product Weight",
            "Damaged Packaging",
            "Insufficient Stock",
            "Inconsistent Product Quality",
            "Temperature Control Failure",
            "Product Recall",
            "Allergen Contamination",
            "Improper Storage Conditions",
            "Product Spillage",
            "Incorrect Instructions",
            "Supply Chain Disruption",
            "Unapproved Supplier",
            "Cross Contamination",
            "Inadequate Cleaning Procedures",
            "Unmet Safety Standards",
            "Improper Documentation",
            "Improper Handling of Product",
            "Unauthorized Access to Product",
            "Packaging Misprint",
            "Mismatched Barcodes",
            "Incorrect Product Placement",
            "Product Damage During Shipping",
            "Improper Disposal of Waste",
            "Recycling Failure",
            "Failure in Product Testing",
            "Excessive Product Waste",
            "System Error in Production",
            "Unsafe Working Conditions",
            "Failure in CCP Monitoring",
            "Failure in Supplier Audit",
            "Deviations in Product Composition",
            "Labeling Non-compliance",
            "Inaccurate Sales Forecasting",
            "Incorrect Product Temperature"
          ];
          $user = User::inRandomOrder()->first();
          $deviation_complaint_deviation_type = DeviationComplaintDeviationTypes::inRandomOrder()->first();
          $remark = DeviationComplaintRemarkTypes::inRandomOrder()->first();
          $type_of_products = DeviationComplaintProductTypes::inRandomOrder()->first();
          $deviation_complaint_line_types = DeviationComplaintLineTypes::inRandomOrder()->first();
          $deviation_complaint_section = DeviationComplaintSections::inRandomOrder()->first();
          $risk_category = DeviationComplaintRiskCategories::inRandomOrder()->first();
        return [
            'user_id'=> 1, //$user->id, //11
            'reference_number'=>"AV-".rand(7000, 6000). '/' . date('Y'),
            'title'=>array_rand($title_example),
            'occurance_date'=> fake()->dateTimeBetween('-1year','now'),
            'deviation_type_id'=>$deviation_complaint_deviation_type->id,
            'deviation_code_id'=> $remark->id,
            'product_id' => $type_of_products->id,
            'risk_category_id'=>$risk_category->id,
            'article_no'=> rand(6000, 8000),
            'batch_no'=> fake()->randomElement([date('y'), date('y') - 1]) +rand(6000, 8000),
            'location_id'=> $deviation_complaint_line_types->id,
            'section_id'=> $deviation_complaint_section->id,
            'status'=> rand(1,2),
            
        ];
    }
}
