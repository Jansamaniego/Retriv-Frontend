import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useGetCartQuery } from '../../redux/services/cartApi/cartApi';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCreatePaymentIntentMutation } from '../../redux/services/paymentIntentApi/paymentIntentApi';

import CheckOutForm from './checkOutForm';
import { RootState } from 'src/redux/store';

interface IAppearance {
  theme: 'stripe' | 'flat' | 'night' | 'none' | undefined;
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

export const CheckOut = () => {
  const initialized = useRef(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const loggedInUser = useSelector((state: RootState) => state.userState.user);
  const { data: cart, isLoading } = useGetCartQuery();
  const [
    createPaymentIntent,
    { isLoading: createPaymentIntentIsLoading, data },
  ] = useCreatePaymentIntentMutation();

  const appearance: IAppearance = {
    theme: 'stripe',
  };

  const { totalPrice } = cart || {};

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const fetchData = async () => {
        if (!isLoading) {
          await createPaymentIntent(totalPrice || 0);

          if (!createPaymentIntentIsLoading && !clientSecret) {
            setClientSecret(data?.clientSecret || '');
            setPaymentIntentId(data?.paymentIntentId || '');
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
