import { Button } from "@headlessui/react";
import React, { useReducer } from "react";

// Initial seat data for VIP and Regular seats
const initialSeatsVIP = [
  { id: 1, type: "VIP", selected: false, price: 100 },
  { id: 2, type: "VIP", selected: false, price: 100 },
  { id: 3, type: "VIP", selected: false, price: 100 },
  { id: 4, type: "VIP", selected: false, price: 100 },
];

const initialSeatsRegular = [
  { id: 1, type: "Regular", selected: false, price: 50 },
  { id: 2, type: "Regular", selected: false, price: 50 },
  { id: 3, type: "Regular", selected: false, price: 50 },
  { id: 4, type: "Regular", selected: false, price: 50 },
];

// Reducer function to handle seat selection and cart total
const seatReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_VIP_SEAT":
      return {
        ...state,
        VIPSeats: state.VIPSeats.map((seat) =>
          seat.id === action.payload.id
            ? { ...seat, selected: !seat.selected }
            : seat
        ),
        cartTotal: calculateTotal([
          ...state.VIPSeats.map((seat) =>
            seat.id === action.payload.id
              ? { ...seat, selected: !seat.selected }
              : seat
          ),
          ...state.RegularSeats,
        ]),
      };
    case "TOGGLE_REGULAR_SEAT":
      return {
        ...state,
        RegularSeats: state.RegularSeats.map((seat) =>
          seat.id === action.payload.id
            ? { ...seat, selected: !seat.selected }
            : seat
        ),
        cartTotal: calculateTotal([
          ...state.VIPSeats,
          ...state.RegularSeats.map((seat) =>
            seat.id === action.payload.id
              ? { ...seat, selected: !seat.selected }
              : seat
          ),
        ]),
      };
    default:
      return state;
  }
};

// Helper function to calculate the cart total
const calculateTotal = (seats) => {
  return seats.reduce((total, seat) => {
    return seat.selected ? total + seat.price : total;
  }, 0);
};

const Seats = () => {
  // UseReducer to manage seat selection and cart total
  const [state, dispatch] = useReducer(seatReducer, {
    VIPSeats: initialSeatsVIP,
    RegularSeats: initialSeatsRegular,
    cartTotal: 0,
  });

  // Handle VIP seat selection
  const handleVIPSeatClick = (seat) => {
    dispatch({ type: "TOGGLE_VIP_SEAT", payload: seat });
  };

  // Handle Regular seat selection
  const handleRegularSeatClick = (seat) => {
    dispatch({ type: "TOGGLE_REGULAR_SEAT", payload: seat });
  };

  return (
    <div className="flex flex-col items-center">
      {/* VIP Section */}
      <div className="mb-4 max-w-[375px]">
        <p className="font-bold mb-2">VIP   | ${initialSeatsVIP[0].price}</p>
        <div className="flex flex-wrap gap-2">
          {state.VIPSeats.map((seat) => (
            <span
              key={seat.id}
              className={`w-6 h-6 border-2 rounded-md cursor-pointer transition-colors ${
                seat.selected ? "bg-white" : "bg-gray-500"
              }`}
              onClick={() => handleVIPSeatClick(seat)}
            ></span>
          ))}
        </div>
      </div>

      {/* Regular Section */}
      <div className="max-w-[375px]">
        <p className="font-bold mb-2">Regular | ${initialSeatsRegular[0].price}</p>
        <div className="flex flex-wrap gap-2">
          {state.RegularSeats.map((seat) => (
            <span
              key={seat.id}
              className={`w-6 h-6 border-2 rounded-md cursor-pointer transition-colors ${
                seat.selected ? "bg-white" : "bg-gray-500"
              }`}
              onClick={() => handleRegularSeatClick(seat)}
            ></span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-xl ">Total: ${state.cartTotal}</h3>
        <button className="border-2 rounded-sm mt-2 w-32 h-10 hover:bg-red translate duration-300 ">Pay</button>
      </div>
      {/* Display Cart Total */}

    </div>
  );
};

export default Seats;
