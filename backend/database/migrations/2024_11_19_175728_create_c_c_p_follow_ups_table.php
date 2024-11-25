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
        Schema::create('ccp_follow_ups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('animal_id');
            $table->string('slaughtered_total');
            $table->enum('slaughter', ['yes', 'no'])->default('no');
            $table->date('date');
            $table->integer('week');
            $table->integer('ham')->nullable()->default(0);
            $table->integer('sternum')->nullable()->default(0);
            $table->integer('front_leg')->nullable()->default(0);
            $table->integer('belly_cut')->nullable()->default(0);
            $table->integer('back')->nullable()->default(0);
            $table->integer('neck')->nullable()->default(0);
            $table->integer('flank')->nullable()->default(0);
            $table->integer('ribs')->nullable()->default(0);
            $table->integer('inside')->nullable()->default(0);
            $table->integer('hind_leg')->nullable()->default(0);
            $table->integer('clean')->default(0);
            $table->integer('total')->default(0);
            $table->integer('percent');
            $table->enum('verify_or_monitor', ['1', '2'])->default('1'); /// 1 is montoring while 2 is verification
            $table->integer('status')->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ccp_follow_ups');
    }
};
