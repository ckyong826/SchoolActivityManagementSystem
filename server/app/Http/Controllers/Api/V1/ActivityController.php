<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Activity;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'activityName' => 'required|string|max:255',
            'description' => 'required|string',
            'venue' => 'required|string|max:255',
            'startDateTime' => 'required|date',
            'endDateTime' => 'required|date|after:startDateTime',
            'maxParticipants' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $activity = Activity::create($request->all());

        return response()->json(['message' => 'Activity created successfully', 'activity' => $activity], 201);
    }

}
