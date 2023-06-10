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
  border: none;
  font-size: 1.6rem;
  max-width: 6ch;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  border-left: 0;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  background: ${(props) => props.theme.primary[600]};
  font-weight: 400;
  cursor: pointer;
  user-select: none;
  color: ${(props) => props.theme.neutral[900]};

  &:hover {
    background: ${(props) =>
      props.secondary ? props.theme.secondary.main : props.theme.primary[700]};
  }

  &:active {
    box-shadow: inset 0 20px 30px 0 rgba(0, 0, 0, 0.1);
    background: ${(props) =>
      props.secondary ? props.theme.secondary.main : props.theme.primary[600]};
  }

  &:disabled {
    background: ${(props) => props.theme.neutral[800]};
    color: ${(props) => props.theme.neutral[500]};
  }
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
