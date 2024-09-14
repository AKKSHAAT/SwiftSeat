<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Exception;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function store(Request $request) {
        // TODO::make ticket 
        $paymentId = $request->paymentId;
        $totalAmount = $request->total;
        $eventId =  $request->eventId;
        $seats = array_column($request->selectedSeats, 'id');

        $ticket = new Ticket();
        try{
            $ticket->user_id = $request->userId;
            $ticket->event_id = $eventId;
            $ticket->seat_number = implode(',', $seats);
            $ticket->payment_id = $paymentId;
            $ticket->amount_paid = $totalAmount;
            $deets = $ticket->save();
            return response()->json([
                'status' =>'success',
                'msg' => "ticket cerated",
                'ticket' => $deets
            ]);
         } catch(Exception $e) {
            return response()->json([
                'status' =>'fail',
                'msg' => $e->getMessage()
            ]);
         }


    }
}
