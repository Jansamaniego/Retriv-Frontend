import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  StyledInput,
  PasswordInput,
  Form,
  StyledLink,
} from '../../components/common';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useLoginUserMutation } from '../../redux/services/authApi/authApi';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const LoginFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

export const Login = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userState.user);
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });

  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit, control } = methods;

  const onSubmit = async (data) => {
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
          <PasswordInput name="password" />
          <StyledLink to="/forgot-password">Forgot your password?</StyledLink>
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
          <StyledLink to="/register">
            Don't have an account yet? Sign up now!
          </StyledLink>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </LoginFlexWrapper>
  );
};
