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
        Schema::create('hygiene_rounds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->date("occurance_date");
            $table->integer('deviation_type_id');
            $table->integer('deviation_code_id');
            $table->integer('risk_category_id');
            $table->integer('product_id');
            $table->integer('location_id');
            $table->integer('section_id');
            $table->integer('danger_id');
            $table->string('implemented_by')->nullable();
            $table->date('cleared_before')->nullable();
            $table->string('status')->default("1");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hygiene_rounds');
    }
};
