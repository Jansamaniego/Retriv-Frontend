import React, { SelectHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
}

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 30rem;
`;

const StyledSelect = styled.select`
  padding: 0.4rem 0.8rem;
  border: 0.1rem solid ${(props) => props.theme.primary.main};
  border-radius: 0.5rem;
  font-size: 2rem;
  font-weight: 400;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  cursor: pointer;
  width: 100%;
  color: ${(props) => props.theme.neutral.text};
  background-color: ${(props) => props.theme.neutral[700]};
  
  &:focus {
    outline-color: ${(props) => props.theme.neutral[200]};
  }

  &:active {
    outline-color: ${(props) => props.theme.neutral[200]};
  }
`;

const GenderSelect: React.FC<Props> = ({ name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <SelectWrapper>
      <StyledSelect {...register(name)} {...props}>
        <option disabled selected>
          Select Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="undisclosed">Undisclosed</option>
      </StyledSelect>
      {errors[name]?.message && <p>{errors[name]?.message?.toString()}</p>}
    </SelectWrapper>
  );
};

export default GenderSelect;
