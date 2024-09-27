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
        Schema::create('lab_inputs', function (Blueprint $table) {
            $table->id();
            $table->integer("PO_number");
            $table->string("batch_number");
            $table->integer("protein_value");
            $table->integer("lactose_value");
            $table->integer("water_value");
            $table->date("result_date");
            $table->integer("status")->default("1");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_inputs');
    }
};
