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
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'matrik_number' => 'required|string|max:255',
            'academic_year' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
        ]);

        // Create a new profile
        $profile = Profile::create($validated);
        return response()->json($profile, 201);
    }

    /**
     * Display the specified resource.
     */

    public function show($id)
    {
        $profile = Profile::find($id);

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
    public function update(Request $request, $id)
    {
        // Validate the request data
        $validated = $request->validate([
            'firstName' => 'sometimes|required|string|max:255',
            'lastName' => 'sometimes|required|string|max:255',
            'profilePicture' => 'sometimes|required|string|max:255',
            'matrikNumber' => 'sometimes|required|string|max:255',
            'academicYear' => 'sometimes|required|string|max:255',
            'phoneNumber' => 'sometimes|required|string|max:20',
            'address' => 'sometimes|required|string|max:255',
            'dateOfBirth' => 'sometimes|required|date',
        ]);

        // Find the profile by ID
        $profile = Profile::find($id);

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
