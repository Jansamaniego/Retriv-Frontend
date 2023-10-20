import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

interface InputWrapperProps {
  marginBottom?: number | string;
}

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  marginBottom?: number | string;
}

const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: ${(props) =>
    props.marginBottom || props.marginBottom === 0
      ? props.marginBottom
      : '0.8rem'};
  width: 100%;
`;

const Input = styled.input`
  padding: 0.4rem 0.8rem;
  border: 0.1rem solid ${(props) => props.theme.primary.main};
  border-radius: 0.5rem;
  font-size: 2rem;
  font-weight: 400;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

  min-height: 4rem;
  color: ${(props) => props.theme.neutral.text};

  &:focus {
    outline-color: ${(props) => props.theme.neutral[200]};
  }
`;

export const StyledInput: React.FC<StyledInputProps> = ({
  name,
  type = 'text',
  marginBottom = 0,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <InputWrapper marginBottom={marginBottom}>
      <Input
        {...register(name, {
          valueAsDate: type === 'date' ? true : false,
        })}
        type={type}
        {...props}
      />
      {errors[name]?.message && <p>{errors[name]?.message?.toString()}</p>}
    </InputWrapper>
  );
};
