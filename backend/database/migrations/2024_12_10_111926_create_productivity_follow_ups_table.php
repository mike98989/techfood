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
        Schema::create('productivity_follow_ups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('day');
            $table->integer('week');
            $table->year('year');
            $table->integer('total_available_hours');
            $table->integer('maintenance_hours');
            $table->integer('available_production_hours');
            $table->integer('lamb');
            $table->integer('pork');
            $table->integer('beef');
            $table->integer('output_per_day');
            $table->integer('total_target_per_day');
            $table->integer('output_per_day_per_time');
            $table->integer('ack_target_qty');
            $table->integer('ack_output_qty');
            $table->integer('ack_target_time');
            $table->integer('ack_output_time');
            $table->string('output_percent');
            $table->integer('deviation_from_contract_qty');
            $table->integer('deviation_from_contract_time');
            $table->integer('accumulated');
            $table->integer('weekly_target');
            $table->integer('weekly_rate');
            $table->integer('average_rate');
            $table->integer("status")->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productivity_follow_ups');
    }
};
