<?php

use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\sale\SaleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::resource('sales', SaleController::class)->only(['store', 'update', 'index']);