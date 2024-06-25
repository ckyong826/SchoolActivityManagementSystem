<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Activity;
use App\Models\Profile;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ActivityController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    // retrieve all activities with users so we can know the number of participants
    public function index()
    {
        $activities = Activity::with('users')->get();

        $activitiesWithProfiles = $activities->map(function ($activity) {
            $usersWithProfiles = $activity->users->map(function ($user) {
                $profile = Profile::where('userID', $user->userID)->first();
                $user->profile = $profile;
                return $user;
            });

            $activity->setRelation('users', $usersWithProfiles);
            return $activity;
        });

        return response()->json($activitiesWithProfiles);
    }

    // retrieve a single activity with users
    public function show($activityID)
    {
        $activity = Activity::with('users')->find($activityID);
        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }

        // Fetch profiles for each user
        $usersWithProfiles = $activity->users->map(function ($user) {
            $profile = Profile::where('userID', $user->userID)->first();
            $user->profile = $profile;
            return $user;
        });

        // Replace the users relation with the new collection that includes profiles
        $activity->setRelation('users', $usersWithProfiles);

        return response()->json($activity);
    }

    // store a new activity
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'activityName' => 'required|string|max:255',
            'description' => 'required|string',
            'venue' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'startDateTime' => 'required|date',
            'endDateTime' => 'required|date|',
            'maxParticipants' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $activity = Activity::create([
            'activityName' => $request->input('activityName'),
            'description' => $request->input('description'),
            'venue' => $request->input('venue'),
            'category' => $request->input('category'),
            'startDateTime' => $request->input('startDateTime'),
            'endDateTime' => $request->input('endDateTime'),
            'maxParticipants' => $request->input('maxParticipants'),
        ]);

        return response()->json(['message' => 'Activity created successfully', 'activity' => $activity], 201);
    }

    // delete an activity
    public function destroy($id)
    {
        $activity = Activity::find($id);

        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }

        $activity->delete();

        return response()->json(['message' => 'Activity deleted successfully'], 200);
    }

    // update an activity
    public function update(Request $request, $id)
    {
        $activity = Activity::find($id);

        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'activityName' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'venue' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'startDateTime' => 'sometimes|required|date',
            'endDateTime' => 'sometimes|required|date',
            'maxParticipants' => 'sometimes|required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $activity->update($request->only([
            'activityName',
            'description',
            'venue',
            'category',
            'startDateTime',
            'endDateTime',
            'maxParticipants',
        ]));

        return response()->json(['message' => 'Activity updated successfully', 'activity' => $activity], 200);
    }



    // register a participant for an activity
    public function registerParticipant(Request $request, $id)
    {
        $activity = Activity::find($id);
        if (!$activity) {
            return response()->json(['message' => 'Activity not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'userID' => 'required|exists:users,userID',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        if ($activity->users()->count() >= $activity->maxParticipants) {
            return response()->json(['message' => 'Activity is full'], 400);
        }

        $activity->users()->attach($request->userID, ['regDate' => now()]);

        return response()->json(['message' => 'User registered successfully']);
    }



}
