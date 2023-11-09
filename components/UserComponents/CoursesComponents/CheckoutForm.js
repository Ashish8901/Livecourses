import React, { useState } from 'react';

const CheckoutForm = ({ clientSecret }) => {
  
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setError(error.message);
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
   
      {error && <div>{error}</div>}
    </form>
  );
};

export default CheckoutForm;
