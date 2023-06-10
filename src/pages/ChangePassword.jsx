import React from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useChangePasswordMutation } from '../redux/services/authApi';
import { Form, useOutletContext } from 'react-router-dom';
import { Button, PasswordInput } from '../components/common';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const ChangePasswordGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 3.2rem;
  column-gap: 1.6rem;
  padding: 1.6rem;
`;

const ChangePasswordHeading = styled.h4`
  padding-bottom: 1.6rem;
`;

const ButtonContainer = styled.div`
  grid-column: 1 / span 2;
`;

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const changePasswordSchema = z
    .object({
      currentPassword: z.string(),
      newPassword: z.string().min(9),
      newPasswordConfirmation: z.string(),
    })
    .refine((data) => passwordRegex.text(data.password), {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      path: ['password'],
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
      message: 'Passwords do not match',
      path: ['newPasswordConfirmation'],
    });

  const methods = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data) => {
    changePassword(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ChangePasswordHeading>Change Password</ChangePasswordHeading>
          <ChangePasswordGrid>
            <PasswordInput name="newPassword" placeholder="New Password" />
            <PasswordInput
              name="currentPassword"
              placeholder="Current Password"
            />
            <PasswordInput
              name="newpasswordConfirmation"
              placeholder="New Password Confirmation"
            />
            <ButtonContainer>
              <Button type="submit" disabled={isLoading} superLarge>
                Change Password
              </Button>
            </ButtonContainer>
          </ChangePasswordGrid>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </>
  );
};

export default ChangePassword;
