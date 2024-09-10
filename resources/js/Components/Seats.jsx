import { Button } from "@headlessui/react";
import React, { useState } from "react";

const calculateTotal = (selectedSeats) => {
  return selectedSeats.reduce((total, seat) => total + seat.price, 0);
};

const Seats = ({ VIPSeats, regularSeats }) => {
  const [VIPSeatsArr, setVIPSeatsArr] = useState(VIPSeats);
  const [regularSeatsArr, setRegularSeatsArr] = useState(regularSeats);
  const [selectedSeats, setSelectedSeats] = useState([]); // Tracks seats selected by the user

  console.log(VIPSeats);
  // Handle VIP seat selection
  const handleVIPSeatClick = (currentSeat) => {
    // If seat is already unavailable, do nothing
    if (!currentSeat.is_available) return;

    // Toggle seat selection
    if (selectedSeats.some(seat => seat.id === currentSeat.id)) {
      setSelectedSeats(selectedSeats.filter(seat => seat.id !== currentSeat.id));
    } else {
      setSelectedSeats([...selectedSeats, currentSeat]);
    }
  };

  // Handle Regular seat selection
  const handleRegularSeatClick = (currentSeat) => {
    if (!currentSeat.is_available) return;

    // Toggle seat selection
    if (selectedSeats.some(seat => seat.id === currentSeat.id)) {
      setSelectedSeats(selectedSeats.filter(seat => seat.id !== currentSeat.id));
    } else {
      setSelectedSeats([...selectedSeats, currentSeat]);
    }
  };

  // Total price calculation
  const total = calculateTotal(selectedSeats);

  return (
    <div className="flex flex-col items-center">
      {/* VIP Section */}
      {VIPSeats ? (
        <div className="mb-4 max-w-[375px]">
          <p className="font-bold mb-2">VIP | ${VIPSeats[0].price}</p>
          <div className="flex flex-wrap gap-2">
            {VIPSeatsArr.map((seat) => (
              <span
                key={seat.id}
                className={`w-6 h-6 border-2 rounded-md cursor-pointer transition-colors ${
                  !seat.is_available ? "bg-slate-500 cursor-not-allowed" : 
                  selectedSeats.some(s => s.id === seat.id) ? "bg-red" : ""
                }`}
                onClick={() => handleVIPSeatClick(seat)}
              ></span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Regular Section */}
      <div className="max-w-[375px]">
        <p className="font-bold mb-2">Regular | ${regularSeats[0].price}</p>
        <div className="flex flex-wrap gap-2">
          {regularSeatsArr.map((seat) => (
            <span
              key={seat.id}
              className={`w-6 h-6 border-2 rounded-md cursor-pointer transition-colors ${
                !seat.is_available ? "bg-slate-500 cursor-not-allowed" :
                selectedSeats.some(s => s.id === seat.id) ? "bg-red" : ""
              }`}
              onClick={() => handleRegularSeatClick(seat)}
            ></span>
          ))}
        </div>
      </div>

      {/* Total and Pay Button */}
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-xl">Total: ${total}</h3>
        <button
          className="border-2 rounded-sm mt-2 w-32 h-10 hover:bg-red transition duration-300"
          onClick={() => console.log("Selected Seats: ", selectedSeats)}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default Seats;
