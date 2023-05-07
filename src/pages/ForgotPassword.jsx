import React from 'react';
import { Button, Form, Input } from '../components/common';
import { FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useForgotPasswordMutation } from '../redux/services/authApi';

const ForgotPassword = () => {
  const [sendResetPasswordEmail, { isLoading }] = useForgotPasswordMutation();
  const forgotPasswordSchema = z.object({
    email: z.string().email(),
  });
  const methods = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    sendResetPasswordEmail(data);
  };
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Email" type="email" {...register('email')} />
        {errors.email?.message && <p>{errors.email?.message}</p>}
        <Button type="submit" disabled={isLoading}>
          Send reset password email
        </Button>
      </Form>
      <DevTool control={control} />
    </FormProvider>
  );
};

export default ForgotPassword;
