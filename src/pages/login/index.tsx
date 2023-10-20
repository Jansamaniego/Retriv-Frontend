import React, { useEffect } from 'react';
import styled from 'styled-components';
import { z } from 'zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/store';
import { useLoginUserMutation } from 'redux/services/authApi/authApi';
import {
  Button,
  StyledInput,
  PasswordInput,
  Form,
  StyledLink,
} from 'components/common';

interface FormValues {
  email: string;
  password: string;
}

const LoginFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

export const Login = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentUser = useSelector((state: RootState) => state.userState.user);
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });

  const methods = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, control } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await loginUser(data);
  };

  useEffect(() => {
    if (isSuccess && !isLoading && currentUser) {
      navigate('/');
    }
  }, [isLoading, isSuccess, currentUser, navigate]);

  return (
    <LoginFlexWrapper>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledInput placeholder="Email" type="email" name="email" />
          <PasswordInput name="password" placeholder="Password" />
          <StyledLink
            to="/forgot-password"
            isActive={pathname === '/forgot-password'}
          >
            Forgot your password?
          </StyledLink>
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
          <StyledLink to="/register" isActive={pathname === '/register'}>
            Don't have an account yet? Sign up now!
          </StyledLink>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </LoginFlexWrapper>
  );
};
