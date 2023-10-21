<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BreedController extends Controller
{
    public function index($page, $limit, $kind)
    {
        // Replace with your actual API endpoints and API keys
        $catApiUrl = env('CAT_API_ENDPOINT');
        $dogApiUrl = env('DOG_API_ENDPOINT');

        // Fetch data based on the 'kind' parameter
        if ($kind === 'Both') {
            // Fetch data from both the Cat and Dog APIs
            $catApiResponse = Http::get($catApiUrl);
            $dogApiResponse = Http::get($dogApiUrl);
            $catResults = $catApiResponse->json();
            $dogResults = $dogApiResponse->json();
        } elseif ($kind === 'Cat') {
            // Fetch data only from the Cat API
            $catApiResponse = Http::get($catApiUrl);
            $catResults = $catApiResponse->json();
            $dogResults = [];
        } elseif ($kind === 'Dog') {
            // Fetch data only from the Dog API
            $dogApiResponse = Http::get($dogApiUrl);
            $dogResults = $dogApiResponse->json();
            $catResults = [];
        } else {
            // Handle invalid 'kind' values (optional)
            return response()->json(['error' => 'Invalid kind parameter'], 400);
        }

        // Add 'type' attribute based on 'kind'
        $catResultsWithType = array_map(function ($result) {
            $result['type'] = 'cat';
            return $result;
        }, $catResults);

        $dogResultsWithType = array_map(function ($result) {
            $result['type'] = 'dog';
            return $result;
        }, $dogResults);
        // Combine results with 'type' attribute
        $combinedResults = array_merge($catResultsWithType, $dogResultsWithType);

        // Paginate the results

        return response()->json([
            'page' => $page,
            'limit' => $limit,
            'results' => $combinedResults,
        ]); 
    }



    public function show($breed)
    {
        // Implement logic to fetch and return paginated images for a specific breed
    }

    public function getImage($imageId)
    {
        // Implement logic to fetch and return a specific cat or dog image by image ID
    }
}
