<?php

use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\UserController;
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

Route::middleware('auth:sanctum')->group(function () {

   Route::get('user',function(Request $request){
    return[
        'user' => $request->user(),
        'currentToken' => $request->bearerToken()
    ];
   });

   Route::post('user/logout',[UserController::class,'logout']);

   Route::post('save-main-category', [ProductController::class, 'saveMainCategory'])->name('saveMainCategory');
   Route::get('get-main-category',[ProductController::class, 'getMainCategory'])->name('getMainCategory');
   Route::post('save-super-category',[ProductController::class, 'saveSuperCategory'])->name('saveSuperCategory');
   Route::get('get-super-category',[ProductController::class, 'getSuperCategory'])->name('getSuperCategory');
   Route::post('save-sub-category',[ProductController::class,'subcategory'])->name('save-sub-category');


});

Route::post('user/login',[UserController::class,'auth']);
Route::post('user/register',[UserController::class,'store']);
