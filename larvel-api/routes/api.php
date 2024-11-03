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
   Route::delete('delete-main-category/{id}',[ProductController::class, 'DeleteMainCategory'])->name('delete-main-category');

   Route::post('save-super-category',[ProductController::class, 'saveSuperCategory'])->name('saveSuperCategory');
   Route::get('get-super-category',[ProductController::class, 'getSuperCategory'])->name('getSuperCategory'); 
   Route::delete('delete-super-category/{id}',[ProductController::class, 'DeleteSuperCategory'])->name('delete-super-category');

   Route::post('save-sub-category',[ProductController::class,'subcategory'])->name('save-sub-category');
   Route::get('get-sub-category',[ProductController::class, 'getSubCategory'])->name('getSubCategory');
   Route::delete('delete-sub-category/{id}',[ProductController::class, 'DeleteSubCategory'])->name('delete-sub-category');
   
   
   Route::post('save-specification',[ProductController::class, 'saveSpecification'])->name('save-specification');
   Route::get('get-specifications',[ProductController::class, 'getSpecifications'])->name('get-specifications');
   Route::post('specification-status',[ProductController::class,'SpecificationStatus'])->name('specification-actions');
   Route::delete('specification-delete/{id}',[ProductController::class,'DeleteSpecification'])->name('specification-delete');
   Route::patch('specification-update/{id}',[ProductController::class,'UpdateSpecification'])->name('specification-update');
  
   

   Route::post('save-productList',[ProductController::class, 'saveProductList'])->name('save-productList');
   Route::delete('delete-product-list/{id}',[ProductController::class, 'DeleteProductList'])->name('save-productList');

   Route::get('get-main-super-category',[ProductController::class,'getMainSuperData'])->name('get-main-super-category');
   Route::get('get-super-sub-category',[ProductController::class,'getSuperSubData'])->name('get-super-sub-category');
   Route::get('get-sub-and-productlist-category',[ProductController::class,'getSubAndProductListData'])->name('get-sub-and-productlist-category');

  
});

Route::post('user/login',[UserController::class,'auth']);
Route::post('user/register',[UserController::class,'store']);
