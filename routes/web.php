<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeatController;
use App\Models\Event;
use Faker\Provider\ar_EG\Payment;
use GuzzleHttp\Psr7\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PSpell\Config;
use Razorpay\Api\Api;

Route::get('/', function () {
    $events = Event::limit(10)->get();
    return Inertia::render('Event/Index', [
        'events' => $events
    ]);
})->name('event.index');




// web.php
Route::get('/events/{event}', function (Event $event) {
    $regularSeats = $event->seats()->where('type', 'Regular')->get();
    $VIPSeats = $event->seats()->where('type', 'VIP')->get();
    return Inertia::render('Event/Show', [
        'event' => $event,
        'regularSeats' => $regularSeats,
        'VIPSeats' => $VIPSeats
    ]);
})->name('events.show');





Route::get('tickets', function() {
    $event = Event::find(1);

    
    return inertia('Ticket/Index', [
        'event' => $event,
    ]);
})->name('tickets.index');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::post('seats/check-availability', [SeatController::class, 'checkAvailability'])->name('seats.checkAvailability');



// web.php (routes file)
Route::post('/razorpay', [PaymentController::class, 'processPayment'])->middleware(['auth'])->name('payment.razorpay');
Route::post('payment-verify', [PaymentController::class, 'verify'])->middleware(['auth'])->name('payment.verify');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
