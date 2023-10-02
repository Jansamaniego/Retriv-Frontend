import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

interface ToggleButtonProps {
  secondary?: boolean;
}

interface PasswordInputProps {
  placeholder: string;
  name: string;
}

const PasswordInputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const StyledPasswordInput = styled.input`
  padding: 0.4rem 0.8rem;
  border: 0.1rem solid ${(props) => props.theme.primary.main};
  border-radius: 0.5rem;
  font-size: 2rem;
  font-weight: 400;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  min-height: 4rem;
  color: ${(props) => props.theme.neutral.text};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;

  &:focus {
    outline-color: ${(props) => props.theme.neutral[200]};
  }
`;

const ToggleButton = styled.div<ToggleButtonProps>`
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

export const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder = 'password',
  name,
  ...props
}) => {
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
      {errors[name]?.message && <p>{errors[name]?.message?.toString()}</p>}
    </>
  );
};
