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
    ? process.env.REACT_APP_API_LOCAL_BASE_URL
    : process.env.REACT_APP_API_WEB_BASE_URL
}/api`;

interface FormValues {
  email: string;
  password: string;
}

const LoginFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
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

const StyledStyledLink = styled(StyledLink)`
  color: ${(props) => props.theme.neutral[400]};
`;

const GoogleOAuthButton = styled.button`
  display: flex;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.8rem 1.2rem;
  background-color: ${(props) => props.theme.neutral[900]};

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

const GoogleOAuthText = styled.h6`
  color: ${(props) => props.theme.neutral.text};
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

  console.log(currentUser);

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
          <StyledStyledLink
            to="/forgot-password"
            isActive={pathname === '/forgot-password'}
          >
            Forgot your password?
          </StyledStyledLink>
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
                <GoogleOAuthText>Continue with Google</GoogleOAuthText>
              </GoogleOAuthFlexWrapper>
            </GoogleOAuthButton>
            <StyledStyledLink
              to="/register"
              isActive={pathname === '/register'}
            >
              Don't have an account yet? Sign up now!
            </StyledStyledLink>
          </FlexWrapper>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </LoginFlexWrapper>
  );
};
