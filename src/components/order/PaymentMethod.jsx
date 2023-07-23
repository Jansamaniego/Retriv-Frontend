import { PaymentElement } from '@stripe/react-stripe-js';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const PaymentMethod = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return <PaymentElement {...register('card')} />;
};

export default PaymentMethod;
