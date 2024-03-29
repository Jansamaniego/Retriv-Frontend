import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';

import { RootState } from 'redux/store';
import { useGetCartQuery } from 'redux/services/cartApi/cartApi';
import { useCreateOrderMutation } from 'redux/services/orderApi/orderApi';
import DeliveryAddress from 'pages/checkOut/checkOutForm/deliveryAddress';
import CheckOutItemList from 'pages/checkOut/checkOutForm/checkOutItemList';
import Payment from 'pages/checkOut/checkOutForm/payment';
import OrderDetails from 'pages/checkOut/checkOutForm/orderDetails';

interface CheckOutFormProps {
  paymentIntentId: string;
}

interface FormValues {
  paymentMethod: string;
  phone: string;
  address: string;
  country: string;
  postalCode: string;
}

const CheckoutPageFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CheckOutForm: React.FC<CheckOutFormProps> = ({ paymentIntentId }) => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state: RootState) => state.userState.user);
  const { data: cart, isLoading } = useGetCartQuery();
  const [createOrder, { isLoading: createOrderIsLoading }] =
    useCreateOrderMutation();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCash, setIsCash] = useState(true);

  const orderSchema = z.object({
    paymentMethod: z.string(),
    phone: z.string(),
    address: z.string(),
    country: z.string(),
    postalCode: z.string(),
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      address: loggedInUser?.address || '',
      country: '',
      postalCode: '',
      paymentMethod: 'cash',
      phone: loggedInUser?.phone || '',
    },
    resolver: zodResolver(orderSchema),
  });

  const { handleSubmit, control } = methods;

  const { items, totalPrice, totalQuantity } = cart || {};

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
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
          setMessage(result?.error?.message?.toString() || '');
        } else {
          setMessage('An unexpected error occured.');
        }
      }

      await createOrder({
        cartId: cart?._id || '',
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
        cartId: cart?._id || '',
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

  const toggleIsCash: (value: boolean) => void = (value) => {
    setIsCash(value);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CheckoutPageFlexWrapper>
          <DeliveryAddress />
          <CheckOutItemList items={items || []} />
          <Payment isCash={isCash} setIsCash={toggleIsCash} />
          {message && <div>{message}</div>}
          <OrderDetails
            totalPrice={totalPrice || 0}
            totalQuantity={totalQuantity || 0}
            isLoading={isLoading && isProcessing && createOrderIsLoading}
          />
        </CheckoutPageFlexWrapper>
      </Form>
      <DevTool control={control} />
    </FormProvider>
  );
};

export default CheckOutForm;
