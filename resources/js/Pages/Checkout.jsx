import React, { useEffect, useState } from "react";

const Checkout = ({ data, selectedSeats, total }) => {
  const [options, setOptions] = useState(data);

  console.logoption

  //load Razorpay checkout script
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handleCheckout = (e) => {
    e.preventDefault();

    // Add handler to Razorpay options to capture the payment details
    const paymentOptions = {
      ...options, 
      handler: function (response) {
        // This function will handle the response from Razorpay
        document.getElementById('razorpay_order_id').value = options.order_id;
        document.getElementById('razorpay_payment_id').value = response.razorpay_payment_id;
        document.getElementById('razorpay_signature').value = response.razorpay_signature;

        // Submit the form to your backend for verification
        document.razorpayform.submit();
      },
      modal: {
        ondismiss: function() {
          alert('Payment popup closed');
        }
      }
    };

    // Initialize Razorpay checkout
    const paymentObject = new window.Razorpay(paymentOptions);
    paymentObject.open();
  };

  return (
    <>
      <form name="razorpayform" action={route('payment.verify')} method="POST">
          <input type="hidden" name="razorpay_order_id" id="razorpay_order_id" />
        <input type="hidden" name="razorpay_payment_id" id="razorpay_payment_id" />
        <input type="hidden" name="razorpay_signature" id="razorpay_signature" />
        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
      </form>
      
      <button className="bg-red" onClick={handleCheckout}>
      
        Checkout
      </button>
    </>
  );
};

export default Checkout;
