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
        Schema::create('slaughter_head_meat_midriffs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('slaughter_number');
            $table->integer('week');
            $table->string('slaughter_house');
            $table->date('slaughter_date');
            $table->string('product_id');
            $table->date('pieces_date')->nullable();
            $table->string('animal_id');
            $table->string('aerobic');
            $table->string('e_coli');
            $table->string('staphylococcus');
            $table->integer('status')->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slaughter_head_meat_midriffs');
    }
};
