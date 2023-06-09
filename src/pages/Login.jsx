import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  StyledInput,
  PasswordInput,
  Form,
  StyledLink,
} from '../components/common';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useLoginUserMutation } from '../redux/services/authApi';

let renderCount = 0;

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });

  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    control,
  } = methods;

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <>
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
    </>
  );
};

export default Login;
