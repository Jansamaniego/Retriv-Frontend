import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useGetCartQuery } from '../../redux/services/cartApi';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCreatePaymentIntentMutation } from '../../redux/services/paymentIntentApi';

import CheckOutForm from './checkOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const CheckOut = () => {
  const initialized = useRef(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const loggedInUser = useSelector((state) => state.userState.user);
  const { data: cart, isLoading } = useGetCartQuery();
  const [createPaymentIntent, { isLoading: createPaymentIntentIsLoading }] =
    useCreatePaymentIntentMutation();

  const appearance = {
    theme: 'stripe',
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const fetchData = async () => {
        if (!isLoading) {
          const response = await createPaymentIntent(cart.totalPrice);
          if (!createPaymentIntentIsLoading && !clientSecret) {
            setClientSecret(response.data.clientSecret);
            setPaymentIntentId(response.data.paymentIntentId);
          }
        }
      };

      fetchData();
    }
  }, []);

  if (isLoading || createPaymentIntentIsLoading || !clientSecret)
    return <h1>Loading...</h1>;

  console.log(clientSecret);

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
        <CheckOutForm paymentIntentId={paymentIntentId} />
      </Elements>
    )
  );
};
