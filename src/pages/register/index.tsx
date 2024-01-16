import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ZodError, z } from 'zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import { RootState } from 'redux/store';
import { useRegisterUserMutation } from 'redux/services/authApi/authApi';
import {
  Form,
  StyledInput,
  PasswordInput,
  Button,
  ImageUpload,
  StyledModal,
} from 'components/common';
import RegisterStepTracker from './registerStepTracker';
import { isErrorWithMessage } from 'redux/services/helpers';

interface FormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  address?: string;
  phone?: number;
  gender?: 'male' | 'female' | 'other' | 'undisclosed';
  dateOfBirth?: Date;
}

interface IMutatedData {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  address?: string;
  phone?: number;
  gender?: 'male' | 'female' | 'other' | 'undisclosed';
  dateOfBirth?: Date;
  image: File;
}

interface ITitle {
  [props: string]: string;
}

type EmptyString = '' | null | undefined;

const RegisterFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const FormFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ImageUploadWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonFlexWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RegisterText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

const ErrorText = styled.h4`
  color: ${(props) => props.theme.neutral.text};
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

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const MB_BYTES = 1000000;

const TITLE: ITitle = {
  0: 'Authentication Info',
  1: 'Personal Info',
  2: 'Shipping Info',
  3: 'Profile Photo',
  4: 'Great job for completing the form. Please press the register button to complete the registration.',
};

export const Register = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.userState.user);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [
    passwordConfirmationErrorMessage,
    setPasswordConfirmationErrorMessage,
  ] = useState('');
  const [image, setImage] = useState<File | EmptyString>(null);
  const [imageError, setImageError] = useState<{
    isError: boolean;
    message: string;
  } | null>(null);
  const [registerUser, { isLoading, isSuccess, error }] =
    useRegisterUserMutation();

  const modelSchema = z.object({
    username: z
      .string()
      .min(9, { message: 'Username must contain at least 9 characters' }),
    email: z.string().email(),
    password: z
      .string()
      .min(9, { message: 'Password must contain at least 9 characters' }),
    passwordConfirmation: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    address: z.string().optional(),
    phone: z.coerce.number().optional(),
    gender: z.enum(['male', 'female', 'other', 'undisclosed']),
    dateOfBirth: z.date().optional(),
  });

  const authenticationInfoSchema = modelSchema
    .pick({
      username: true,
      email: true,
      password: true,
      passwordConfirmation: true,
    })
    .refine((data) => passwordRegex.test(data.password), {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter and on number',
      path: ['password'],
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    });

  const personalInfoSchema = modelSchema.pick({
    firstName: true,
    lastName: true,
    gender: true,
    dateOfBirth: true,
  });

  const shippingInfoSchema = modelSchema.pick({
    address: true,
    phone: true,
  });

  const registerSchema = modelSchema
    .refine((data) => passwordRegex.test(data.password), {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      path: ['password'],
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    });

  const methods = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!image) {
      return;
    }

    const mutatedData: IMutatedData = { ...data, image };

    const formData = new FormData();

    for (const key in mutatedData) {
      //@ts-ignore
      formData.append(key, mutatedData[key as keyof IMutatedData]);
    }

    await registerUser(formData);
  };

  useEffect(() => {
    if (isSuccess && !isLoading && currentUser) {
      navigate('/');
    }
  }, [isSuccess, isLoading, currentUser, navigate]);

  const nextFormStep = () => {
    if (formStep === 0) {
      try {
        const canNext = authenticationInfoSchema.parse({
          username: watch('username'),
          email: watch('email'),
          password: watch('password'),
          passwordConfirmation: watch('passwordConfirmation'),
        });

        if (canNext) {
          setPasswordErrorMessage('');
          setPasswordConfirmationErrorMessage('');
          setFormStep((curr) => curr + 1);
        }
      } catch (error) {
        if (error instanceof ZodError) {
          const passwordError = error.issues.find(
            (issue) => issue.path[0] === 'password'
          );
          if (passwordError) {
            setPasswordErrorMessage(passwordError.message);
          }
          const passwordConfirmationError = error.issues.find(
            (issue) => issue.path[0] === 'passwordConfirmation'
          );
          if (passwordConfirmationError) {
            setPasswordConfirmationErrorMessage(
              passwordConfirmationError.message
            );
          }
        }
      }
      return;
    }

    if (formStep === 1) {
      try {
        const canNext = personalInfoSchema.parse({
          firstName: watch('firstName'),
          lastName: watch('lastName'),
          gender: watch('gender'),
          dateOfBirth: watch('dateOfBirth'),
        });

        if (canNext) {
          setFormStep((curr) => curr + 1);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }

    if (formStep === 2) {
      try {
        const canNext = shippingInfoSchema.parse({
          address: watch('address'),
          phone: watch('phone'),
        });

        if (canNext) {
          setFormStep((curr) => curr + 1);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }

    if (formStep === 3) {
      if (image) {
        setFormStep((curr) => curr + 1);
      }

      return;
    }
  };

  const prevFormStep = () => {
    setFormStep((curr) => curr - 1);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const changeImage: (image: File | EmptyString) => void = (image) => {
    setImage(image);
  };

  const applyError: (
    error: { isError: boolean; message: string } | null
  ) => void = (error) => {
    setImageError(error);
  };

  useEffect(() => {
    if (!isLoading && isSuccess && currentUser) {
      navigate('/');
    }
  }, [isLoading, isSuccess, navigate]);

  return (
    <RegisterFlexWrapper>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormFlexWrapper>
            <RegisterStepTracker formStep={formStep} />
            <RegisterText>{TITLE[formStep]}</RegisterText>
            {formStep === 0 && (
              <FlexWrapper>
                <StyledInput placeholder="Username" name="username" />
                <StyledInput placeholder="Email" type="email" name="email" />
                <PasswordInput name="password" placeholder="Password" />
                {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
                <PasswordInput
                  name="passwordConfirmation"
                  placeholder="Confirm password"
                />
                {passwordConfirmationErrorMessage && (
                  <p>{passwordConfirmationErrorMessage}</p>
                )}
              </FlexWrapper>
            )}
            {formStep === 1 && (
              <FlexWrapper>
                <StyledInput placeholder="First Name" name="firstName" />
                <StyledInput placeholder="Last Name" name="lastName" />
                <StyledSelect {...register('gender')}>
                  <option>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="undisclosed">Undisclosed</option>
                </StyledSelect>
                {errors.gender?.message && <p>{errors.gender?.message}</p>}
                <StyledInput
                  placeholder="DateOfBirth"
                  type="date"
                  name="dateOfBirth"
                />
              </FlexWrapper>
            )}
            {formStep === 2 && (
              <FlexWrapper>
                <StyledInput placeholder="Address" name="address" />
                <StyledInput placeholder="Phone" name="phone" type="number" />
              </FlexWrapper>
            )}
            {formStep === 3 && (
              <ImageUploadWrapper>
                <ImageUpload
                  name="image"
                  fileSizeLimit={5 * MB_BYTES}
                  image={image}
                  changeImage={changeImage}
                  error={imageError}
                  applyError={applyError}
                />
              </ImageUploadWrapper>
            )}
            {formStep === 4 && (
              <>
                {isErrorWithMessage(error) && (
                  <ErrorText>{error?.data?.message}</ErrorText>
                )}
              </>
            )}
            <ButtonFlexWrapper>
              {formStep !== 0 && (
                <Button onClick={prevFormStep} type="button">
                  prev
                </Button>
              )}
              {formStep !== 4 && (
                <Button onClick={nextFormStep} type="button">
                  next
                </Button>
              )}
              {formStep === 4 && (
                <Button
                  disabled={isLoading}
                  onClick={openRegisterModal}
                  type="button"
                >
                  Register
                </Button>
              )}
            </ButtonFlexWrapper>
          </FormFlexWrapper>
          {isRegisterModalOpen && (
            <StyledModal
              isModalOpen={isRegisterModalOpen}
              closeModal={closeRegisterModal}
              isLoading={isLoading}
            >
              Are you sure you want to create this Shop?
            </StyledModal>
          )}
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </RegisterFlexWrapper>
  );
};
