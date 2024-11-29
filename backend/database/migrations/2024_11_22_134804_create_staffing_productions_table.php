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
        Schema::create('staffing_productions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('day');
            $table->integer('week');
            $table->year('year');
            $table->integer('weekly_total_hours_cleaned')->nullable()->default(0);
            $table->integer('weekly_total_hours_worked')->nullable()->default(0);
            $table->integer('supervisor')->nullable()->default(0);
            $table->integer('quality_control')->nullable()->default(0);
            $table->integer('operator_staff')->nullable()->default(0);
            $table->integer('total_hours')->nullable()->default(0);
            $table->integer('production_quantity')->nullable()->default(0);
            $table->integer('status')->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staffing_productions');
    }
};
