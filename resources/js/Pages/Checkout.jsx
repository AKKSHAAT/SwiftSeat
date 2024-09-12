import React, { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const Checkout = ({ data, selectedSeats, total, eventId }) => {
  const { auth } = usePage().props;

  const [options, setOptions] = useState(data); // Razorpay options
  console.log("options in checkout::", options)
  console.log('options:::::: ', options);
  
  const [msg, setMsg] = useState(null);

  // Inertia useForm hook for payment data
  const paymentForm = useForm({
    razorpay_order_id: '',
    razorpay_payment_id: '',
    razorpay_signature: '',
  });

  // Inertia useForm hook for booking data
  const bookingForm = useForm({
    user: auth.user.id,
    eventId,
    selectedSeats,
    paymentId: '',
    total,
  });

  // Load Razorpay checkout script
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onmsgor = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);


  useEffect(() => {
    console.log("Payment Form Data: ", paymentForm.data);
  }, [paymentForm.data]);

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!options || !options.order_id) {
      setMsg('Order data is missing. Please try again.');
      return;
    }

    const paymentOptions = {
      ...options,
      handler: function (response) {
        // Set payment form data for Inertia POST request
        paymentForm.setData({
          razorpay_order_id: options.order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });        
        console.log(paymentForm);

        // First, verify payment with Inertia POST request
        paymentForm.post('/payment-verify', {
          onSuccess: () => {
            setMsg("Payment verified successfully ✅");

            // After payment verification, send booking details
            bookingForm.setData('paymentId', options.order_id); // Add paymentId to booking data
            bookingForm.post('/tickets', {
              onSuccess: () => {
                console.log('Booking confirmed.');
                // Optionally, handle success actions (e.g., redirect to a thank-you page)
              },
              onmsgor: () => {
                setMsg('Booking failed ⛔');
              },
            });
          },
          onmsgor: () => {
            setMsg('Payment verification failed ⛔');
          }
        });
      },
      modal: {
        ondismiss: function () {
          // Handle dismiss actions if needed
        },
      },
    };

    // Initialize Razorpay checkout
    const paymentObject = new window.Razorpay(paymentOptions);
    paymentObject.open();
  };

  return (
    <>
      <div>
        <h1 className="text-5xl font-bold text-center my-10">Make Payment</h1>
        {msg && <p className="text-2xl font-bold text-center my-10">{msg}</p>}

        <div className="max-w-md mx-auto z-10 rounded-3xl">
          <div className="flex flex-col">
            <div className="border-2 relative drop-shadow-2xl rounded-3xl p-4 m-4">
              <div className="flex-none sm:flex">
                <div className="flex-auto justify-evenly">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center my-1">
                      <h2 className="font-medium">{"Event.title"}</h2>
                    </div>
                    <div className="ml-auto text-red">
                      Order ID: {options.order_id}
                    </div>
                  </div>
                  <div className="border-dashed border-b-2 my-5"></div>
                  <div className="flex items-center pb-1">
                    Seats:
                    {selectedSeats &&
                      selectedSeats.map((seat, index) => (
                        <div key={index}>
                          <p className="p-1">{seat.seat_number}</p>
                        </div>
                      ))}
                  </div>
                  <p className="text-xl">Total ₹{total}</p>
                  <div className="border-dashed border-b-2 mb-5 pt-5">
                    <div className="absolute rounded-full w-5 h-5 bg-black -mt-2 -left-2"></div>
                    <div className="absolute rounded-full w-5 h-5 bg-black -mt-2 -right-2"></div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="bg-red py-1 px-3 rounded hover:bg-black border translate: duration-300"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
