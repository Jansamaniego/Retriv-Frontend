import { useState, useEffect } from 'react';
import {
  Button,
  Form,
  StyledInput,
  TransparentPopup,
} from '../../components/common';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useForgotPasswordMutation } from '../../redux/services/authApi/authApi';

interface FormValues {
  email: string;
}

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
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput placeholder="Email" type="email" {...register('email')} />
        {errors.email?.message && <p>{errors.email?.message}</p>}
        <Button type="submit" disabled={isLoading}>
          Send reset password email
        </Button>
        {isTransparentPopupOpen && (
          <TransparentPopup>
            <h3>
              An email has been sent to the email address: {watch('email')}
            </h3>
          </TransparentPopup>
        )}
      </Form>
      <DevTool control={control} />
    </FormProvider>
  );
};
