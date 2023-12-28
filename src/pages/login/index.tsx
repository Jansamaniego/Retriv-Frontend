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
import { GoogleIcon } from 'assets/icons';

const BASE_URL = `${
  process.env.REACT_APP_NODE_ENV === 'development'
    ? process.env.REACT_APP_API_BASE_URL
    : process.env.RENDER_EXTERNAL_HOSTNAME
}/api`;

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

const ErrorText = styled.h6`
  color: ${(props) => props.theme.primary.main};
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

const GoogleOAuthButton = styled.button`
  display: flex;
  border-radius: 0.5rem;
  width: 100%;

  padding: 0.8rem 1.2rem;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.neutral[700]};
  }

  &:active {
    box-shadow: inset 0 20px 30px 0 rgba(0, 0, 0, 0.1);
    background: none;
  }
`;

const GoogleOAuthFlexWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 1.6rem;
`;

export const Login = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentUser = useSelector((state: RootState) => state.userState.user);
  const [loginUser, { isLoading, isSuccess, isError }] = useLoginUserMutation();

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

  const googleSignInOnClickHandler = () => {
    window.open(`${BASE_URL}/auth/google/url`, '_self');
  };

  console.log(isError);

  return (
    <LoginFlexWrapper>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FlexWrapper>
            <StyledInput
              placeholder="Email"
              type="email"
              name="email"
              isRegister={false}
            />
            <PasswordInput
              name="password"
              placeholder="Password"
              isRegister={false}
            />
          </FlexWrapper>
          <StyledLink
            to="/forgot-password"
            isActive={pathname === '/forgot-password'}
          >
            Forgot your password?
          </StyledLink>
          {isError && <ErrorText>Incorrect Email or password</ErrorText>}
          <FlexWrapper>
            <Button type="submit" disabled={isLoading}>
              Login
            </Button>
            <GoogleOAuthButton
              onClick={googleSignInOnClickHandler}
              type="button"
            >
              <GoogleOAuthFlexWrapper>
                <GoogleIcon width="3rem" height="3rem" />
                <h6>Continue with Google</h6>
              </GoogleOAuthFlexWrapper>
            </GoogleOAuthButton>
            <StyledLink to="/register" isActive={pathname === '/register'}>
              Don't have an account yet? Sign up now!
            </StyledLink>
          </FlexWrapper>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </LoginFlexWrapper>
  );
};
