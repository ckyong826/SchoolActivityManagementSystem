<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'registrationID' => $this->registrationID,
            'userID' => $this->userID,
            'activityID' => $this->activityID,
            'regDate' => $this->regDate->format('Y-m-d H:i:s'),
        ];
    }
}
