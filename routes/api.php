<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BreedController;

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
Route::get('/breeds/{page}/{limit}/{kind}', [BreedController::class, 'index']);

/* Route::get('/v1/breeds/{breed}', 'Api\BreedController@show');
Route::get('/v1/images/{image}', 'Api\BreedController@getImage');
 */
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
