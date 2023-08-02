import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-router-dom';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import styled from 'styled-components';
import { useGetCartQuery } from '../redux/services/cartApi';
import { useSelector } from 'react-redux';
import DeliveryAddress from '../components/order/DeliveryAddress';
import OrderDetails from '../components/order/OrderDetails';
import PaymentMethod from '../components/order/PaymentMethod';
import PlaceOrder from '../components/order/PlaceOrder';
import OrderItemList from '../components/order/OrderItemList';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCreatePaymentIntentMutation } from '../redux/services/paymentIntentApi';
import OrderItemListHeader from '../components/order/OrderItemListHeader';
import Payment from '../components/order/Payment';
import { Card } from '../components/common';
import CheckOutForm from './CheckOutForm';

const CheckoutPageFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckOut = () => {
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
    const fetchData = async () => {
      if (!isLoading) {
        const response = await createPaymentIntent(cart.totalPrice);

        if (!createPaymentIntentIsLoading) {
          setClientSecret(response.data.clientSecret);
          setPaymentIntentId(response.data.paymentIntentId);
        }
      }
    };
    fetchData();
  }, []);

  if (isLoading || createPaymentIntentIsLoading) return <h1>Loading...</h1>;

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
        <CheckOutForm paymentIntentId={paymentIntentId} />
      </Elements>
    )
  );
};

export default CheckOut;
