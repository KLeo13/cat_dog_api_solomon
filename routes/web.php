<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BreedController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/v1/breeds', function (){
    return view('welcome');
});
Route::get('/v1/breeds?page={page}&limit={limit}', function (){
    return view('welcome');
});
Route::get('v1/breeds/dog', function (){
    return view('welcome');
});
Route::get('v1/breeds/cat', function (){
    return view('welcome');
});
Route::get('/v1/image/{image_id}', function (){
    return view('welcome');
});
