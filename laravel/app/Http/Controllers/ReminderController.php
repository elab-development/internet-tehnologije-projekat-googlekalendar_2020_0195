<?php

namespace App\Http\Controllers;

use App\Models\Reminder;
use App\Http\Resources\ReminderResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReminderController extends Controller
{
    public function index()
    {
        return ReminderResource::collection(Reminder::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'dogadjaj_id' => 'required|exists:dogadjajs,id',
            'reminder_time' => 'required|date',
            'note' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $reminder = Reminder::create($validator->validated());

        return new ReminderResource($reminder);
    }

    public function show($id)
    {
        $reminder = Reminder::findOrFail($id);
        return new ReminderResource($reminder);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'dogadjaj_id' => 'sometimes|required|exists:dogadjajs,id',
            'reminder_time' => 'sometimes|required|date',
            'note' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $reminder = Reminder::findOrFail($id);
        $reminder->update($validator->validated());

        return new ReminderResource($reminder);
    }

    public function destroy($id)
    {
        $reminder = Reminder::findOrFail($id);
        $reminder->delete();

        return response()->json(null, 204);
    }
}
