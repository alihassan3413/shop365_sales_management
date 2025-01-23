<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'total_sale', 'bank_sale', 'card_swipe', 'cash', 
        'daily_expense', 'other_expense', 'bills_paid', 
        'daily_expense_notes', 'other_expense_notes', 
        'paid_bills_details', 'pending_payments', 
        'pending_payments_details', 'difference'
    ];
}
