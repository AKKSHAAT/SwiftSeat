import { usePage, useForm } from '@inertiajs/react'; // Correct import
import React, { useState } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

const calculateTotal = (selectedSeats) => {
  return selectedSeats.reduce((total, seat) => total + seat.price, 0);
};

const Seats = ({ VIPSeats, regularSeats, event_id }) => {
  const { auth } = usePage().props;
  const [VIPSeatsArr, setVIPSeatsArr] = useState(VIPSeats);
  const [regularSeatsArr, setRegularSeatsArr] = useState(regularSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [err, setErr] = useState(null);

  // Using useForm to manage form state
  const { data, setData, post } = useForm({
    selectedSeats: [],
    total: 0,
    user: auth.user
  });

  const handleVIPSeatClick = (currentSeat) => {
    if (!currentSeat.is_available) return;
    setSelectedSeats((prev) => prev.some(seat => seat.id === currentSeat.id)
      ? prev.filter(seat => seat.id !== currentSeat.id)
      : [...prev, currentSeat]);
  };

  const handleRegularSeatClick = (currentSeat) => {
    if (!currentSeat.is_available) return;
    setSelectedSeats((prev) => prev.some(seat => seat.id === currentSeat.id)
      ? prev.filter(seat => seat.id !== currentSeat.id)
      : [...prev, currentSeat]);
  };

  const handlePayment = () => {
    setData('selectedSeats', selectedSeats);
    setData('total', calculateTotal(selectedSeats));

    axios.post(route('seats.checkAvailability'), { selectedSeats })
      .then(response => {
        console.log('Success:', response.data);
        console.log('sending to razorpay');
        data.selectedSeats = selectedSeats,
        data.total = total,
        post('/razorpay', {
          onSuccess: () => {
            console.log('recived from razorpay');
            // const { data, selectedSeats, total } = response.data;
            // Inertia.get(route('checkout.show'), {
            //   data: data,
            //   selectedSeats: selectedSeats,
            //   total: total,
            //   eventId: event_id
            // });
          }
        });
      })
      .catch(error => {
        console.error("Error:", error);
        setErr(error.response.data.error);
      });
  };

  // Total price calculation
  const total = calculateTotal(selectedSeats);

  return (
    <div className="flex flex-col items-center">
      {err && <p className="text-red">{err}</p>}

      {VIPSeats ? (
        <div className="mb-4 max-w-[375px]">
          <p className="font-bold mb-2">VIP | ${VIPSeats[0].price}</p>
          <div className="flex flex-wrap gap-2">
            {VIPSeatsArr.map((seat) => (
              <span
                key={seat.id}
                className={`w-6 h-6 border-2 rounded-md cursor-pointer transition-colors ${!seat.is_available ? "bg-slate-500 cursor-not-allowed" : selectedSeats.some(s => s.id === seat.id) ? "bg-red" : ""}`}
                onClick={() => handleVIPSeatClick(seat)}
              ></span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="max-w-[375px]">
        <p className="font-bold mb-2">Regular | ${regularSeats[0].price}</p>
        <div className="flex flex-wrap gap-2">
          {regularSeatsArr.map((seat) => (
            <span
              key={seat.id}
              className={`w-6 h-6 border-2 rounded-md cursor-pointer transition-colors ${!seat.is_available ? "bg-slate-500 cursor-not-allowed" : selectedSeats.some(s => s.id === seat.id) ? "bg-red" : ""}`}
              onClick={() => handleRegularSeatClick(seat)}
            ></span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-xl">Total: ${total}</h3>
        <button className="border-2 rounded-sm mt-2 w-32 h-10 hover:bg-red transition duration-300" onClick={handlePayment}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default Seats;
