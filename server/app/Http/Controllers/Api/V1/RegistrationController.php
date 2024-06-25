<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Http\Requests\UpdateRegistrationRequest;
use App\Http\Resources\RegistrationResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class RegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RegistrationResource::collection(
            Registration::all()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'userID' => 'required|integer',
            'activityID' => 'required|integer',
        ]);

        // Insert data into the database
        DB::table('registrations')->insert([
            'userID' => $validatedData['userID'],
            'activityID' => $validatedData['activityID'],
            'regDate' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        // Return a JSON response
        return response()->json(['message' => 'Registration created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Registration $registration)
    {
        error_log(print_r($registration->toArray(), true));
        return new RegistrationResource($registration);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRegistrationRequest $request, Registration $registration)
    {
        error_log($request);
        $data = $request->validated();
        error_log(print_r($data, true));
        $registration->update($data);
        return new RegistrationResource($registration);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Registration $registration)
    {
        $registration->delete();
        return response('', 204);
    }

    // Get all registrations for a specific user
    public function userRegistrations($userID)
    {
        return response()->json(
            Registration::where('userID', $userID)->get()->map(function ($registration) {
                return [
                    'registrationID' => $registration->registrationID,
                    'userID' => $registration->userID,
                    'activityID' => $registration->activityID,
                    'regDate' => $registration->regDate->format('Y-m-d H:i:s'),
                ];
            })
        );
    }

}
