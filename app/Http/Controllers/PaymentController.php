<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Razorpay\Api\Api;
use SebastianBergmann\CodeCoverage\Report\Xml\Totals;

use function Pest\Laravel\options;
namespace App\Http\Controllers;

use App\Models\Seat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Razorpay\Api\Api;

class PaymentController extends Controller
{
    public function processPayment( Request $request)
    {   
        $selectedSeats = $request->input('selectedSeats');
        $total = $request->input('total'); 
        $user = $request->user();

        $api_key = config('services.razorpay.razorpay_key');
        $api_secret = config('services.razorpay.razorpay_secret');
        $api = new Api($api_key, $api_secret);
        
        try {
        $order = $api->order->create([
            'amount' => $total * 100,
            'currency' => 'INR',
            'payment_capture' => 1 // Auto capture payment
        ]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Failed to create Razorpay order'], 500);
        }


        $data = [
            "key"  => $api_key, 
            "amount" => $order['amount'], // In paise
            "currency" => $order['currency'],
            "name" => "$user->name",
            "description" => "Ticket Purchase",
            "image" => "",
            "prefill" => [
                "name" =>" $user->name",
                "email" => "$user->email"
            ],
            "notes" => [
                "address" => "n/a",
                "merchant_order_id" => $order['id'],
            ],
            "theme" => [
                "color"  => "#3399cc"
            ],
            "order_id" => $order['id'], // Pass the order ID from Razorpay
        ];

        // dd($data);
    // ----------everything is fine till here--------------

        return response()->json([
            'data' => $data, 
            'selectedSeats' => $selectedSeats,
            'total' => $total,
        ]);
        
    }


    public function verify(Request $request) {
        $api_key = config('services.razorpay.razorpay_key');
        $api_secret = config('services.razorpay.razorpay_secret');
        $api = new Api($api_key, $api_secret);

    try {
        // Fetch the payment details
        $attributes = [
            'razorpay_order_id' => $request->razorpay_order_id,
            'razorpay_payment_id' => $request->razorpay_payment_id,
            'razorpay_signature' => $request->razorpay_signature,
        ];
        $api->utility->verifyPaymentSignature($attributes);
        
        //verified
        return response()->json(['status' => 'success', 'message' => 'Payment verified successfully']);
    
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => 'Payment verification failed']);
    }
}
}
