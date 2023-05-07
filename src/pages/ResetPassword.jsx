import React from 'react';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, PasswordInput } from '../components/common';
import { DevTool } from '@hookform/devtools';
import { useResetPasswordMutation } from '../redux/services/authApi';
import { useSearchParams } from 'react-router-dom';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [searchParams, setSearchParams] = useSearchParams();

  const resetToken = searchParams.get('token') || '';
  const resetPasswordSchema = z
    .object({
      password: z.string().min(9),
      passwordConfirmation: z.string().min(9),
    })
    .refine((data) => passwordRegex.test(data.password), {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      path: ['password'],
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    });

  const methods = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const { handleSubmit, control } = methods;

  const onSubmit = (data) => {
    resetPassword({ ...data, resetToken });
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput name="password"></PasswordInput>
        <PasswordInput
          placeholder="Confirm password"
          name="passwordConfirmation"
        ></PasswordInput>
        <Button type="submit" disabled={isLoading}>
          Reset Password
        </Button>
      </Form>
      <DevTool control={control} />
    </FormProvider>
  );
};

export default ResetPassword;
