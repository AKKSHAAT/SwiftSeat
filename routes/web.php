<?php

use App\Http\Controllers\ProfileController;
use App\Models\Event;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return inertia('Ticket/Index');
})->name('tickets.index');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');

    
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
