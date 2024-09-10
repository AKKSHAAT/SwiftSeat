<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SeatController extends Controller
{
    public function checkAvailability(Request $request) {
        $selectedSeats = $request->input('selectedSeats');
        dd($selectedSeats);

        
        return response()->json(['message' => 'Seats checked successfully']);
    }
}
