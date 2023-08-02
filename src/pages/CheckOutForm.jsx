import React, { useState } from 'react';
import styled from 'styled-components';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Form } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import DeliveryAddress from '../components/order/DeliveryAddress';
import OrderItemList from '../components/order/OrderItemList';
import Payment from '../components/order/Payment';
import { Button, Card } from '../components/common';
import OrderDetails from '../components/order/OrderDetails';
import { useGetCartQuery } from '../redux/services/cartApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddressElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useCreateOrderMutation } from '../redux/services/orderApi';
import { removeCart } from '../redux/features/cartSlice';

const CheckoutPageFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CheckOutForm = ({ paymentIntentId }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userState.user);
  const { data: cart, isLoading } = useGetCartQuery();
  const [createOrder, { isLoading: createOrderIsLoading }] =
    useCreateOrderMutation();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCash, setIsCash] = useState(true);

  const orderSchema = z.object({
    paymentMethod: z.string(),
    phone: z.string(),
    address: z.string(),
    country: z.string(),
    postalCode: z.string(),
  });

  const methods = useForm({
    defaultValues: {
      address: loggedInUser.address,
      country: '',
      postalCode: '',
      paymentMethod: 'cash',
      phone: loggedInUser.phone,
    },
    resolver: zodResolver(orderSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const { address: userAddress } = loggedInUser;

  const { items, totalPrice, totalQuantity } = cart;

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!isCash) {
      setIsProcessing(true);

      createOrder({
        paymentMethod: data.paymentMethod,
        phone: data.phone,
        shippingAddress: {
          country: data.country,
          postalCode: data.postalCode,
          address: data.address,
        },
        paymentIntent: paymentIntentId,
      });

      dispatch(removeCart());

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}/completion`,
        },
      });

      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occured.');
      }

      setIsProcessing(false);
    } else {
      createOrder({
        paymentMethod: 'cash',
        phone: data.phone,
        shippingAddress: {
          country: data.country,
          postalCode: data.postalCode,
          address: data.address,
        },
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CheckoutPageFlexWrapper>
          <DeliveryAddress address={userAddress} />
          <OrderItemList items={items} />
          <Payment isCash={isCash} setIsCash={setIsCash} />
          {message && <div>{message}</div>}
          <OrderDetails
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            isLoading={isLoading && isProcessing && createOrderIsLoading}
          />
        </CheckoutPageFlexWrapper>
      </Form>
      <DevTool control={control} />
    </FormProvider>
  );
};

export default CheckOutForm;
