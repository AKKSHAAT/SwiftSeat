<?php
namespace App\Http\Controllers;

use App\Models\Payment;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Razorpay\Api\Api;
use Razorpay\Api\Order;
use WpOrg\Requests\Exception\Http\Status503;

class PaymentController extends Controller
{

    // public function gets(Request $request) {
    //     dd(Auth::user()->id);
    // }

    
    public function savePayment($id, $totalAmount) {
        $payment = new Payment();
        $payment->payment_id = $id;
        $payment->status = 'done';
        $payment->amount = $totalAmount;
        $payment->user_id = Auth::user()->id;
        try{
            $payment->save();
            return $payment;
        } catch(Exception $e) {
            throw new \Exception('Failed to save payment.');
        }

     }

    public function processPayment(Request $request)
    {   
        $selectedSeats = $request->input('selectedSeats');
        $total = $request->input('total'); 
        // $user = Auth::user();

        $api_key = config('services.razorpay.razorpay_key');
        $api_secret = config('services.razorpay.razorpay_secret');
        $api = new Api($api_key, $api_secret);
        
        try {
            $order = $api->order->create([
                'amount' => $total * 100, // Convert to paise
                'currency' => 'INR',
                'payment_capture' => 1, // Auto capture payment
                'receipt' => 'order_receipt_12345' // Unique receipt
            ]);
            

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'err',
                'message' => $e->getMessage()
            ]);
        }

        $data = [
            "key" => $api_key, 
            "amount" => $order['amount'], // In paise
            "currency" => $order['currency'],
            "name" => 'vanghoh',
            "description" => "Ticket Purchase",
            "order_id" => $order['id'], // Razorpay order ID
            "prefill" => [
                "name" => 'vanghoh',
                "email" => 'lamoo@gmai.com'
            ],
            "notes" => [
                "address" => "n/a",
                "merchant_order_id" => $order['id'],
            ],
            "theme" => [
                "color" => "#3399cc"
            ]
        ];

        // Inertia::render('Checkout', [
        //     'data' => $data, 
        //     'selectedSeats' => $selectedSeats,
        //     'total' => $total
        // ]);

        return response()->json([
            'status' =>'success',
            'data' => $data, 
            'selectedSeats' => $selectedSeats,
            'total' => $total
        ]);
    }

    public function verify(Request $request)
    {
        $api_key = config('services.razorpay.razorpay_key');
        $api_secret = config('services.razorpay.razorpay_secret');
        $api = new Api($api_key, $api_secret);
        try {
            $attributes = [
                'razorpay_order_id' => $request->razorpay_order_id,
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature' => $request->razorpay_signature,
            ];
            $api->utility->verifyPaymentSignature($attributes);

            try{
                $paymentData = $this->savePayment($request->razorpay_payment_id, 1.00);

                return response()->json([
                    'status' =>'success',
                    'payment' => $paymentData,
                ]);


                // redirect()->route('tickets.store')->with([
                //     'payment' => $paymentData,
                //     'total' => 1.00,
                // ]);

                //TODO:: 'event_id' => $request->event_id 
            } catch(Exception $e) {
                return response()->json([
                    'status' => 'err',
                    'message' => $e->getMessage()
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'err',
                'message' => $e->getMessage()
            ]);
        }
    }
}
