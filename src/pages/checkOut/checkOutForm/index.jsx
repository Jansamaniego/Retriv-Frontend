import React, { useState } from 'react';
import styled from 'styled-components';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Form, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import DeliveryAddress from './deliveryAddress';
import CheckOutItemList from './checkOutItemList';
import Payment from './payment';
import OrderDetails from './orderDetails';
import { useGetCartQuery } from '../../../redux/services/cartApi/cartApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddressElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useCreateOrderMutation } from '../../../redux/services/orderApi/orderApi';
import { removeCart } from '../../../redux/features/cartSlice';

const CheckoutPageFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CheckOutForm = ({ paymentIntentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

      const result = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        // confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: `${window.location.origin}/completion`,
        // },
      });

      console.log(result);

      if (result.error) {
        if (
          result.error.type === 'card_error' ||
          result.error.type === 'validation_error'
        ) {
          setMessage(result.error.message);
        } else {
          setMessage('An unexpected error occured.');
        }
      }

      await createOrder({
        cartId: cart._id,
        paymentMethod: data.paymentMethod,
        phone: data.phone,
        shippingAddress: {
          country: data.country,
          postalCode: data.postalCode,
          address: data.address,
        },
        paymentIntent: paymentIntentId,
      });

      setIsProcessing(false);

      navigate('/completion');
    } else {
      await createOrder({
        cartId: cart._id,
        paymentMethod: 'cash',
        phone: data.phone,
        shippingAddress: {
          country: data.country,
          postalCode: data.postalCode,
          address: data.address,
        },
      });

      navigate('/completion');
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CheckoutPageFlexWrapper>
          <DeliveryAddress address={userAddress} />
          <CheckOutItemList items={items} />
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
