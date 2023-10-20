import React, { useState, useRef, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { useGetCartQuery } from 'redux/services/cartApi/cartApi';
import { useCreatePaymentIntentMutation } from 'redux/services/paymentIntentApi/paymentIntentApi';
import CheckOutForm from 'pages/checkOut/checkOutForm';

interface IAppearance {
  theme: 'stripe' | 'flat' | 'night' | 'none' | undefined;
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

export const CheckOut = () => {
  const initialized = useRef(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const { data: cart, isLoading } = useGetCartQuery();
  const [createPaymentIntent, { isLoading: createPaymentIntentIsLoading }] =
    useCreatePaymentIntentMutation();

  const appearance: IAppearance = {
    theme: 'stripe',
  };

  const { totalPrice } = cart || {};

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const fetchData = async () => {
        if (!isLoading) {
          const res = await createPaymentIntent(totalPrice!);

          if (!createPaymentIntentIsLoading && !clientSecret) {
            if ('data' in res) {
              setClientSecret(res?.data?.clientSecret || '');
              setPaymentIntentId(res?.data?.paymentIntentId || '');
            }
          }
        }
      };

      fetchData();
    }
  }, []);

  if (isLoading || createPaymentIntentIsLoading || !clientSecret)
    return <h1>Loading...</h1>;

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
        <CheckOutForm paymentIntentId={paymentIntentId} />
      </Elements>
    )
  );
};
