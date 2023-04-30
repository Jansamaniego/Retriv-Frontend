import React from 'react';
import styled from 'styled-components';
import { Input } from '../components/common';

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid #eee;
  padding: 16px;
  box-sizing: border-box;
  color: black;
  border-radius: 4px;
`;

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <Form>
        <Input name="username" placeholder="Username" />
      </Form>
    </>
  );
};

export default Login;
