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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('total_sale');
            $table->string('bank_sale')->nullable();
            $table->string('card_swipe')->nullable();
            $table->string('cash')->nullable();
            $table->string('daily_expense')->nullable();
            $table->string('other_expense')->nullable();
            $table->string('bills_paid')->nullable();
            $table->text('daily_expense_notes')->nullable();
            $table->text('other_expense_notes')->nullable();
            $table->text('paid_bills_details')->nullable();
            $table->string('pending_payments')->nullable();
            $table->text('pending_payments_details')->nullable();
            $table->string('difference')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
