<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Http\Requests\StoreRegistrationRequest;
use App\Http\Requests\UpdateRegistrationRequest;
use App\Http\Resources\RegistrationResource;

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
    public function store(StoreRegistrationRequest $request)
    {
        $data = $request->validated();
        $registration = Registration::create($data);
        return response(new RegistrationResource($registration), 201);
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
}
