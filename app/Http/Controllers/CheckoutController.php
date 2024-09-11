<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function showCheckout(Request $request)
    {
        // Get the passed data from the request (or session, or database, depending on your logic)
        $data = $request->input('data');
        $selectedSeats = $request->input('selectedSeats');
        $total = $request->input('total');

        // Render the Checkout page with the passed data
        return Inertia::render('Checkout', [
            'data' => $data,
            'selectedSeats' => $selectedSeats,
            'total' => $total,
        ]);
    }
}
