import React, { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const Checkout = ({ data, selectedSeats, total, eventId }) => {
  const { auth } = usePage().props;
  const [options, setOptions] = useState(data); // Razorpay options
  const [msg, setMsg] = useState(null);

  // Payment form to store Razorpay payment details
  const paymentForm = useForm({
    razorpay_order_id: '',
    razorpay_payment_id: '',
    razorpay_signature: '',
  });

  // Booking form for sending seat booking data
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
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Ensure Razorpay script is loaded
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handleCheckout = (e) => {
    e.preventDefault();
  
    if (!options || !options.order_id) {
      setMsg('Order data is missing. Please try again.');
      return;
    }
  
    const paymentOptions = {
      ...options,
      handler: function (response) {
        // Instead of using setData, pass the data directly to post
          const paymentData = {
            razorpay_order_id: options.order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
  
          console.log("Payment Data:", paymentData); // Ensure the data is correct
          // ctrl+z
          // Send the payment data directly
          axios.post('/payment-verify', paymentData)
            .then((response) => {
                // if (response.status === 'success') {
                //     setMsg("Payment verified successfully ✅");
                console.log("res", response.data);
                    const ticketData = {
                        selectedSeats,
                        paymentId: response.data.payment.id,
                        total,
                        eventId,
                        userId : auth.user.id,
                    };
                    axios.post('/tickets', ticketData)
                        .then((res) => {
                            setMsg('Booking confirmed! ✅');
                            console.log(res.data);
                        })
                        .catch(err=>{
                            setMsg('Booking failed ⛔');
                            console.log(err.data);
                        })
                    
                    setMsg('Payment verification failed ⛔');
            }) 
          
      },
      modal: {
        ondismiss: function () {
          setMsg('Payment popup closed.');
        }
      }
    };
  
    const paymentObject = new window.Razorpay(paymentOptions);
    paymentObject.open();
  };
  

  return (
    <div>
      <h1 className="text-5xl font-bold text-center my-10">Make Payment</h1>
      {msg && <p className="text-2xl font-bold text-center my-10">{msg}</p>}

      <div className="max-w-md mx-auto z-10 rounded-3xl">
        <div className="border-2 relative drop-shadow-2xl rounded-3xl p-4 m-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{"Event Title"}</h2>
            <div className="ml-auto text-red">Order ID: {options.order_id}</div>
          </div>
          <div className="border-dashed border-b-2 my-5"></div>
          <p className="text-xl">Total: ₹{total}</p>
          <button
            className="bg-red py-1 px-3 rounded hover:bg-black border transition duration-300 mx-auto"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
