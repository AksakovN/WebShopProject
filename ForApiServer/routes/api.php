<?php

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


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('products', 'App\Http\Controllers\ProductController@index');
Route::get('products_for_main', 'App\Http\Controllers\ProductController@forMain');

Route::get('categories', 'App\Http\Controllers\CategoryController@index');

Route::get('subcategories', 'App\Http\Controllers\SubcategoryController@index');

Route::post('product', 'App\Http\Controllers\ProductController@getProduct');

Route::post('search', 'App\Http\Controllers\ProductController@searchProducts');

Route::post('favourite', 'App\Http\Controllers\ProductController@favouriteProducts');

Route::post('productsByCategory', 'App\Http\Controllers\ProductController@getByCategory');

Route::post('register', 'App\Http\Controllers\Api_usersController@register');

Route::post('login', 'App\Http\Controllers\Api_usersController@login');

Route::post('setCommentary', 'App\Http\Controllers\CommentaryController@setCommentary');

Route::post('changeCommentary', 'App\Http\Controllers\CommentaryController@changeCommentary');

Route::post('getCommentaries', 'App\Http\Controllers\CommentaryController@getCommentaries');

Route::post('addFav', 'App\Http\Controllers\Api_usersController@addToFav')->middleware('auth:sanctum');

Route::post('me', 'App\Http\Controllers\Api_usersController@me')->middleware('auth:sanctum');

Route::post('logout', 'App\Http\Controllers\Api_usersController@logout')->middleware('auth:sanctum');







// Route::get('categories', function () {
//     return response(Category::all(), 200);
// });

// Route::get('subcategories', function () {
//     return response(Subcategory::all(), 200);
// });



