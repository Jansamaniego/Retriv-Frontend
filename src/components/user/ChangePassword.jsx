import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useChangePasswordMutation } from '../../redux/services/authApi';
import { Form } from 'react-router-dom';
import { Button, PasswordInput } from '../common';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const ChangePassword = ({ user }) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const { password } = user;

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
    .refine((data) => data.currentPassword === password, {
      message: 'Wrong current password input',
      path: ['currentPassword'],
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
      <h1>Change Password</h1>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <PasswordInput
            name="currentPassword"
            placeholder="Current Password"
          />
          <PasswordInput name="newPassword" placeholder="New Password" />
          <PasswordInput
            name="newpasswordConfirmation"
            placeholder="New Password Confirmation"
          />
          <Button type="submit" disabled={isLoading}>
            Change Password
          </Button>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </>
  );
};

export default ChangePassword;
