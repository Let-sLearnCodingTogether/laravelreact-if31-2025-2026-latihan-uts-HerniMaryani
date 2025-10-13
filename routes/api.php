<?php

use App\Http\Controllers\QuoteController;
use Illuminate\Support\Facades\Route;

Route::apiResource('quotes', QuoteController::class);