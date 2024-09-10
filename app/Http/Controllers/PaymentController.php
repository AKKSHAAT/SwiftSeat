<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Razorpay\Api\Api;
use SebastianBergmann\CodeCoverage\Report\Xml\Totals;

use function Pest\Laravel\options;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Razorpay\Api\Api;

class PaymentController extends Controller
{
    public function processPayment()
    {
        $api_key = config('services.razorpay.razorpay_key');
        $api_secret = config('services.razorpay.razorpay_secret');
        $api = new Api($api_key, $api_secret);

        $order = $api->order->create([
            'amount' => 100 * 100, // 100 INR in paise
            'currency' => 'INR',
            'receipt' => 'order_receipt_id_123',
            'payment_capture' => 1 // Auto capture payment
        ]);

        $data = [
            "key"  => $api_key, 
            "amount" => $order['amount'],
            "currency" => $order['currency'],
            "name" => "Acme Corp",
            "description" => "Test transaction",
            "image" => "https://cdn.razorpay.com/logos/GhRQcyean79PqE_medium.png",
            "prefill" => [
                "name" => "Gaurav Kumar",
                "email" => "gaurav.kumar@example.com",
                "contact" => "9000090000",
            ],
            "notes" => [
                "address" => "Razorpay Corporate Office",
                "merchant_order_id" => "12312321",
            ],
            "theme" => [
                "color"  => "#3399cc"
            ],
            "order_id" => $order['id'],  
        ];

        return Inertia::render('Checkout', [
            'data' => $data, // No need to json_encode here, Inertia will handle it
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
