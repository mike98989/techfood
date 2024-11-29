<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('oee_follow_ups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->date('date');
            $table->integer('number_of_planned_break')->default(0);
            $table->integer('default_planned_break_in_min')->default(0);
            $table->integer('number_of_meal_break')->default(0);
            $table->integer('default_meal_break_in_min')->default(0);
            $table->integer('down_time_in_min')->default(0);
            $table->integer('run_rate_in_ppm')->default(0);
            $table->integer('total_quality_piece')->default(0);
            $table->integer('rejected_piece')->default(0);
            $table->integer('total_working_hours_daily')->default(0);
            $table->integer('total_planned_break')->default(0);
            $table->integer('total_meal_break')->default(0);
            $table->integer('planned_production_time')->default(0);
            $table->integer('operating_time')->default(0);
            $table->integer('good_piece')->default(0);
            $table->string('availability');
            $table->string('performance');
            $table->string('quality');
            $table->string('overall_oee');
            $table->integer('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oee_follow_ups');
    }
};
