<?php

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

Route::get('category', 'api\CategoryController@index');
Route::post('category/store', 'api\CategoryController@store');
Route::delete('category/delete/{id}', 'api\CategoryController@destroy');
Route::get('category/edit/{id}', 'api\CategoryController@edit');
Route::put('category/update/{id}', 'api\CategoryController@update');
