<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Razorpay\Api\Api;
use App\Models\Payment;
use App\Models\Seat;
use Log;

use function Termwind\render;

class PaymentController extends Controller
{
    public function processPayment(Request $request)
    {   
        //shyd ye checkout hai i am not sure
        $selectedSeats = $request->input('selectedSeats');
        $total = $request->input('total'); 
        $user = $request->user();

        // dd($selectedSeats, $total, $user);
        $api_key = config('services.razorpay.razorpay_key');
        $api_secret = config('services.razorpay.razorpay_secret');
        $api = new Api($api_key, $api_secret);
        // dd($api_key, $api_secret);
        
        try {
            $order = $api->order->create([
                'amount' => $total * 100, // Convert to paise
                'currency' => 'INR',
                'payment_capture' => 1, // Auto capture payment
                'receipt' => 'order_receipt_12345'
            ]);
        } catch (\Exception $e) {
            // Log::error('Failed to create Razorpay order: ' . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Failed to create Razorpay order'], 500);
        }

        $data = [
            "key"  => $api_key, 
            "amount" => $order['amount'], // In paise
            "currency" => $order['currency'],
            "name" => $user->name,
            "description" => "Ticket Purchase",
            "prefill" => [
                "name" => $user->name,
                "email" => $user->email
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

        // dd('fine till here');
        return inertia('Checkout', [
            'data' => $data, 
            'selectedSeats' => $selectedSeats,
            'total' => $total
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

            // Verify the payment signature
            $api->utility->verifyPaymentSignature($attributes);

            return response([
                'status' => 'success', 
                'message' => 'Payment verified successfully',
                'payment_id' => $attributes['razorpay_payment_id']
            ]);

        } catch (\Exception $e) {
            dd('in verift:::: ', $e->getMessage());
            // Log::error('Payment verification failed: ' . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Payment verification failed'], 500);
        }
    }
}
