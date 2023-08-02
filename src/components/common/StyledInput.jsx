import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '0.8rem'};
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

export const StyledInput = ({
  name,
  type = 'text',
  marginBottom,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <InputWrapper marginBottom>
      <Input {...register(name)} type={type} {...props} />
      {errors[name]?.message && <p>{errors[name]?.message}</p>}
    </InputWrapper>
  );
};
