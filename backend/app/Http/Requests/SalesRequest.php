<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'total_sale' => ['required', 'numeric'],
            'bank_sale' => ['nullable', 'numeric'],
            'card_swipe' => ['nullable', 'numeric'],
            'cash' => ['nullable', 'numeric'],
            'daily_expense' => ['nullable', 'numeric'],
            'other_expense' => ['nullable', 'numeric'],
            'bills_paid' => ['nullable', 'numeric'],
            'daily_expense_notes' => ['nullable', 'string'],
            'other_expense_notes' => ['nullable', 'string'],
            'paid_bills_details' => ['nullable', 'string'],
            'pending_payments' => ['nullable', 'numeric'],
            'pending_payments_details' => ['nullable', 'string'],
            'difference' => ['nullable', 'numeric']
        ];
    }
}
