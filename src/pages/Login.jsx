import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput, Form } from '../components/common';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useLoginUserMutation } from '../redux/services/authApi';
import styled from 'styled-components';

let renderCount = 0;

const StyledLink = styled(Link)`
  padding: 4px 8px;
  display: block;
  text-align: center;
  box-sizing: border-box;
  margin: auto 0;
  font-weight: ${(p) => (p.isActive ? 'bold' : 'normal')};
  color: black;
`;

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
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <>
      <h1>{renderCount}</h1>
      <h1>Login</h1>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Email" type="email" {...register('email')} />
          {errors.email?.message && <p>{errors.email?.message}</p>}
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
