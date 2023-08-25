import React from 'react';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  PasswordInput,
  TransparentPopup,
} from '../components/common';
import { DevTool } from '@hookform/devtools';
import { useResetPasswordMutation } from '../redux/services/authApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { CheckIcon } from '../assets/icons';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isTransparentPopupOpen, setIsTransparentPopupOpen] = useState(false);
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();
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

  useEffect(() => {
    const toggleTransparentPopup = () => {
      setIsTransparentPopupOpen(true);
      setTimeout(() => {
        setIsTransparentPopupOpen(false);
      }, 3000);
    };

    if (!isLoading && isSuccess) {
      toggleTransparentPopup();
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    }
  }, [isLoading, isSuccess, navigate]);

  const onSubmit = async (data) => {
    await resetPassword({ ...data, resetToken });
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
      {isTransparentPopupOpen && (
        <TransparentPopup>
          <CheckIcon width="3rem" />
          <h3>You have successfully reset your password</h3>
        </TransparentPopup>
      )}
    </FormProvider>
  );
};

export default ResetPassword;
