<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Seat;

class SeatController extends Controller
{
    public function checkAvailability(Request $request) {
        
        $selectedSeats = $request->input('selectedSeats');
        
        if (empty($selectedSeats)) {
            return response()->json(['error' => 'No seats selected'], 400);
        }

        
        $seatIds = array_column($selectedSeats, 'id');

        // Fetch the selected seats from the database and check availability.
        $unavailableSeats = Seat::whereIn('id', $seatIds)
                                ->where('is_available', false)
                                ->get();

        // If unavailable seats exist, return an error response.
        if ($unavailableSeats->isNotEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Some of the selected seats are no longer available.',
                'unavailable_seats' => $unavailableSeats
            ], 422);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'All seats are available.'
        ]);
        
    }
}
