<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DogadjajController;
use App\Http\Controllers\KategorijaController;
use App\Http\Controllers\ReminderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->apiResource('dogadjaji', DogadjajController::class);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

 
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/reminders', [ReminderController::class, 'index']);
    Route::get('/reminders/{id}', [ReminderController::class, 'show']);
    Route::post('/reminders', [ReminderController::class, 'store']);
    Route::put('/reminders/{id}', [ReminderController::class, 'update']);
    Route::delete('/reminders/{id}', [ReminderController::class, 'destroy']);
    Route::apiResource('kategorije', KategorijaController::class);
});

Route::middleware('auth:sanctum')->get('/dogadjaji/search', [DogadjajController::class, 'search']);