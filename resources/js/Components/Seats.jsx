import { usePage, useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';
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

  // Calculate total
  const total = calculateTotal(selectedSeats);

  // Using useForm to manage form state
  const { data, setData, post } = useForm({
    selectedSeats: [],
    total: 0,
    user: auth.user,
  });

  // Update selected seats when user selects a seat
  const handleSeatClick = (currentSeat) => {
    if (!currentSeat.is_available) return;
    setSelectedSeats((prev) =>
      prev.some((seat) => seat.id === currentSeat.id)
        ? prev.filter((seat) => seat.id !== currentSeat.id)
        : [...prev, currentSeat]
    );
  };

  // Update the form data when seats are selected
  useEffect(() => {
    setData({
      selectedSeats,
      total: calculateTotal(selectedSeats),
    });
  }, [selectedSeats]);

  // Handle payment initiation
  const handlePayment = () => {
    // Ensure the form data is correctly updated
    setData({
      selectedSeats,
      total,
    });

    axios
      .post('seats/check-availability', { selectedSeats })
      .then((response) => {
        console.log('Seat REsponse:::::::', response.data);
        axios.post('razorpay', {
          selectedSeats : selectedSeats,
          total : total,
        }) .then((res)=>{
            console.log('Order created and Razorpay payment initialized')
            console.log(res.data);
            Inertia.get('/checkout', {
              event_id,
              data : res.data.data,
              selectedSeats : res.data.selectedSeats,
              total : res.data.total
            });
          }) .catch(err=>console.log('errrr:::::::', err.response.data));
      })
      .catch((error) => {
        console.error('Error:', error);
        setErr(error.response?.data?.error || 'Something went wrong.');
      });
  };

  return (
    <div className="flex flex-col items-center">
      {err && <p className="text-red">{err}</p>}

      {VIPSeats && (
        <div className="mb-4 max-w-[375px]">
          <p className="font-bold mb-2">VIP | ₹{VIPSeats[0].price}</p>
          <div className="flex flex-wrap gap-2">
            {VIPSeatsArr.map((seat) => (
              <span
                key={seat.id}
                className={`w-6 h-6 border-2 rounded-md cursor-pointer transition-colors ${
                  !seat.is_available
                    ? 'bg-slate-500 cursor-not-allowed'
                    : selectedSeats.some((s) => s.id === seat.id)
                    ? 'bg-red'
                    : ''
                }`}
                onClick={() => handleSeatClick(seat)}
              ></span>
            ))}
          </div>
        </div>
      )}

      {regularSeats && (
        <div className="max-w-[375px]">
          <p className="font-bold mb-2">Regular | ₹{regularSeats[0].price}</p>
          <div className="flex flex-wrap gap-2">
            {regularSeatsArr.map((seat) => (
              <span
                key={seat.id}
                className={`w-6 h-6 border-2 rounded-md cursor-pointer transition-colors ${
                  !seat.is_available
                    ? 'bg-slate-500 cursor-not-allowed'
                    : selectedSeats.some((s) => s.id === seat.id)
                    ? 'bg-red'
                    : ''
                }`}
                onClick={() => handleSeatClick(seat)}
              ></span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-xl">Total: ₹{total}</h3>
        <button
          className="border-2 rounded-sm mt-2 w-32 h-10 hover:bg-red transition duration-300"
          onClick={handlePayment}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default Seats;
