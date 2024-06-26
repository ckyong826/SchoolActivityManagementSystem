<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Profile;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all profiles
        $profiles = Profile::all();
        return response()->json($profiles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $userID)
    {
        try{
            // Validate the request data
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'matrikNumber' => 'required|string|max:255',
            'academicYear' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'dateOfBirth' => 'required|date',
        ]);

        // Add the user_id from the URL to the validated data
        $validated['userID'] = $userID;

        // Create a new profile
        $profile = Profile::create($validated);
        return response()->json($profile, 201);
        }

        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server error: ' . $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */

     public function showByUserID($userID)
     {
         $profile = Profile::where('userID', $userID)->first();
     
         // Check if the profile exists
         if (!$profile) {
             return response()->json(['message' => 'Profile not found'], 404);
         }
     
         return response()->json($profile);
     }

     

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $profile = Profile::find($id);

        // Check if the profile exists
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        return response()->json($profile);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $userID)
    {
        // Validate the request data
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'matrikNumber' => 'required|string|max:255',
            'academicYear' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'dateOfBirth' => 'required|date',
        ]);

        // Find the profile by userID
        $profile = Profile::where('userID', $userID)->first();

        // Check if the profile exists
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        // Update the profile
        $profile->update($validated);
        return response()->json($profile);
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the profile by ID
        $profile = Profile::find($id);

        // Check if the profile exists
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        // Delete the profile
        $profile->delete();
        return response()->json(['message' => 'Profile deleted successfully']);
    }

    public function activities($id)
    {
        // Find the profile by ID
        $profile = Profile::find($id);

        // Check if the profile exists
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        $activities = $profile->activities;
        return response()->json($activities);
    }

}
