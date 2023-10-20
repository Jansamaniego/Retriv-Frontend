import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Form } from 'react-router-dom';

import { useChangePasswordMutation } from 'redux/services/authApi/authApi';
import {
  Button,
  Card,
  PasswordInput,
  TransparentPopup,
} from 'components/common';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

interface FormValues {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

const ChangePasswordGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 3.2rem;
  column-gap: 1.6rem;
  padding: 1.6rem;
  max-width: 80rem;

  @media (max-width: 940px) {
    display: flex;
    flex-direction: column;
    max-width: 40rem;
  }
`;

const ChangePasswordHeading = styled.h4`
  padding-bottom: 1.6rem;
`;

const EmptyDiv = styled.div`
  @media (max-width: 940px) {
    display: none;
  }
`;

const ButtonContainer = styled.div``;

export const ChangePassword = () => {
  const [isTransparentPopupOpen, setIsTransparentPopupOpen] = useState(false);
  const [changePassword, { isLoading, isSuccess }] =
    useChangePasswordMutation();

  const changePasswordSchema = z
    .object({
      currentPassword: z.string(),
      newPassword: z.string().min(9),
      newPasswordConfirmation: z.string(),
    })
    .refine((data) => passwordRegex.test(data.newPassword), {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      path: ['newPassword'],
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
      message: 'Passwords do not match',
      path: ['newPasswordConfirmation'],
    });

  const methods = useForm<FormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { handleSubmit, control } = methods;

  const onSubmit: (data: FormValues) => void = async (data) => {
    await changePassword(data);
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
    <Card>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ChangePasswordHeading>Change Password</ChangePasswordHeading>
          <ChangePasswordGrid>
            <PasswordInput
              name="currentPassword"
              placeholder="Current Password"
            />
            <EmptyDiv></EmptyDiv>
            <PasswordInput name="newPassword" placeholder="New Password" />
            <PasswordInput
              name="newPasswordConfirmation"
              placeholder="New Password Confirmation"
            />
            <ButtonContainer>
              <Button type="submit" disabled={isLoading} superLarge>
                Change Password
              </Button>
            </ButtonContainer>
          </ChangePasswordGrid>
          {isTransparentPopupOpen && (
            <TransparentPopup>
              <h3>Your password has been changed.</h3>
            </TransparentPopup>
          )}
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </Card>
  );
};
