import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { useFormContext } from 'react-hook-form';

const PasswordInputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const StyledPasswordInput = styled(Input)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const ToggleButton = styled.div`
  height: 40px;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  font-size: 1.6rem;
  display: flex;
  padding: 0.8rem;
  border-left: 0;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  background: ${(props) => props.theme.offWhite};
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: ${(props) => props.theme.offBlack};
`;

export const PasswordInput = ({ placeholder = 'password', name, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <PasswordInputWrapper>
        <StyledPasswordInput
          {...register(name)}
          {...props}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
        />
        <ToggleButton onClick={() => setShowPassword((s) => !s)}>
          {showPassword ? 'Hide' : 'Show'}
        </ToggleButton>
      </PasswordInputWrapper>
      {errors[name]?.message && <p>{errors[name]?.message}</p>}
    </>
  );
};
