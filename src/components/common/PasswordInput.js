import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { useFormContext } from 'react-hook-form';

const PasswordInputWrapper = styled.div`
  display: flex;

  ~ div {
    margin-bottom: 8px;
  }
`;

const StyledPasswordInput = styled(Input).attrs(() => ({
  type: 'password',
}))`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const ToggleButton = styled.div`
  height: 40px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 0.9em;
  display: flex;
  padding: 8px;
  border-left: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: black;
`;

export const PasswordInput = ({ placeholder = 'password', name, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const watchField = watch(name, '');

  return (
    <>
      <PasswordInputWrapper>
        <StyledPasswordInput {...register(name)} {...props} />
        <ToggleButton onClick={() => setShowPassword((s) => !s)}>
          {showPassword ? 'Hide' : 'Show'}
        </ToggleButton>
      </PasswordInputWrapper>
      <div>{showPassword ? watchField : ''}</div>
      {errors[name]?.message && <p>{errors[name]?.message}</p>}
    </>
  );
};
