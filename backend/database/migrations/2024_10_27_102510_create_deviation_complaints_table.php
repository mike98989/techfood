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
        Schema::create('deviation_complaints', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->date("date");
            $table->string('reference_number');
            $table->string('title');
            $table->date("occurance_date");
            $table->string('deviation_type');
            $table->string('deviation_code');
            $table->string('risk_category');
            $table->string('product');
            $table->string('article_no');
            $table->string('batch_no');
            $table->string('location');
            $table->string('section');
            $table->longText('deviation_description')->nullable();
            $table->longText('suggested_correction')->nullable();
            $table->string('submitter')->nullable();
            $table->string('status')->default("1");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deviation_complaints');
    }
};
