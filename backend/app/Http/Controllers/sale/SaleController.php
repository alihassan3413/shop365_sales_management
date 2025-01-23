<?php

namespace App\Http\Controllers\sale;

use App\Http\Controllers\Controller;
use App\Http\Requests\SalesRequest;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function store(SalesRequest $request)
    {
        $sale = Sale::create($request->validated());

        return response()->json([
            'statusCode' => 200,
            'success' => true,
            'message' => 'Sale created successfully',
            'data' => $sale
        ]);
    }


    public function update(SalesRequest $request, $id)
    {
        $sale = Sale::findOrFail($id);
        if (!$sale) 
        {
            return response()->json(['message' => 'Sale not found'], 404);
        }

        $sale->update($request->validated());
        return response()->json([
            'statusCode' => 200,
            'success' => true,
            'message' => 'Sale updated successfully',
            'data' => $sale
        ]);
    }


    public function index()
    {
       if (request()->has(['start_date', 'end_date'])) {
           $startDate = Carbon::parse(request('start_date'))->startOfDay();
           $endDate = Carbon::parse(request('end_date'))->endOfDay();
       } else {
           $startDate = now()->startOfMonth();
           $endDate = now();
       }
    
       $sales = Sale::whereBetween('created_at', [$startDate, $endDate])
           ->latest()
           ->get();
    
       return response()->json([
           'success' => true,
           'message' => 'Sales fetched successfully',
           'data' => $sales
       ]);
    }    
}
