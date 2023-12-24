import React, { TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';


interface StyledTextAreaProps {
  marginBottom?: string;
}

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string;
  marginBottom?: string;
}

const TextareaWrapper = styled.div``;

const Textarea = styled.textarea<StyledTextAreaProps>`
  padding: 0.4rem 0.8rem;
  border: 0.1rem solid ${(props) => props.theme.primary.main};
  border-radius: 0.5rem;
  font-size: 1.6rem;
  font-weight: 300;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-bottom: ${(props) => props.marginBottom || '0.8rem'};
  width: 50rem;
  height: 8rem;
  color: ${(props) => props.theme.neutral.text};
  resize: none;
`;

export const StyledTextarea: React.FC<Props> = ({
  name,
  marginBottom,
  placeholder,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextareaWrapper>
      <Textarea {...register(name)} marginBottom={marginBottom} {...props} />
      {errors[name]?.message && <p>{errors[name]?.message?.toString()}</p>}
    </TextareaWrapper>
  );
};
