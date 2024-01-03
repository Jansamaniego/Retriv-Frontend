import { useState, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import { useForgotPasswordMutation } from 'redux/services/authApi/authApi';
import { Button, Form, StyledInput, TransparentPopup } from 'components/common';
import styled from 'styled-components';

interface FormValues {
  email: string;
}

const ForgotPasswordFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const FormFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  width: 60ch;
`;

const TransparentPopupText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

export const ForgotPassword = () => {
  const [isTransparentPopupOpen, setIsTransparentPopupOpen] = useState(false);
  const [sendResetPasswordEmail, { isLoading, isSuccess }] =
    useForgotPasswordMutation();
  const forgotPasswordSchema = z.object({
    email: z.string().email(),
  });
  const methods = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
  } = methods;

  console.log(isSuccess);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await sendResetPasswordEmail(data);
  };

  useEffect(() => {
    const toggleTransparentPopup = () => {
      setIsTransparentPopupOpen(true);
      setTimeout(() => {
        setIsTransparentPopupOpen(false);
      }, 3000);
    };

    if (!isLoading && isSuccess) {
      toggleTransparentPopup();
    }
  }, [isLoading, isSuccess]);

  return (
    <ForgotPasswordFlexWrapper>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormFlexWrapper>
            <StyledInput
              placeholder="Email"
              type="email"
              {...register('email')}
            />
            <Button type="submit" disabled={isLoading} superLarge>
              Send reset password email
            </Button>
          </FormFlexWrapper>
          {isTransparentPopupOpen && (
            <TransparentPopup>
              <TransparentPopupText>
                An email has been sent to the email address: {watch('email')}
              </TransparentPopupText>
            </TransparentPopup>
          )}
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </ForgotPasswordFlexWrapper>
  );
};
