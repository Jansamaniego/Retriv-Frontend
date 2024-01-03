import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';

import { useResetPasswordMutation } from 'redux/services/authApi/authApi';
import {
  Button,
  Form,
  PasswordInput,
  TransparentPopup,
} from 'components/common';
import { CheckIcon } from 'assets/icons';
import styled from 'styled-components';

const ResetPasswordText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

interface FormValues {
  password: string;
  passwordConfirmation: string;
}

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [isTransparentPopupOpen, setIsTransparentPopupOpen] = useState(false);
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();

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

  const methods = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await resetPassword({ ...data, resetToken });
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput name="password" placeholder="Password"></PasswordInput>
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
          <ResetPasswordText>You have successfully reset your password</ResetPasswordText>
        </TransparentPopup>
      )}
    </FormProvider>
  );
};
