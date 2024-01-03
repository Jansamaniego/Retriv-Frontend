import React, { useState } from 'react';
import styled from 'styled-components';
import z from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from 'react-router-dom';

import { useCreateUserMutation } from 'redux/services/userApi/userApi';
import {
  Form,
  StyledInput,
  PasswordInput,
  Button,
  Select,
  StyledModal,
  ImageUpload,
} from 'components/common';
import CreateUserStepTracker from './createUserStepTracker';

interface FormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: number;
  gender: 'male' | 'female' | 'other' | 'undisclosed';
  dateOfBirth: Date;
}

interface IMutatedData {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: number;
  gender: 'male' | 'female' | 'other' | 'undisclosed';
  dateOfBirth: Date;
  image: File;
}

interface ITitle {
  [props: string]: string;
}

type EmptyString = '' | null | undefined;

const CreateUserFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

const FormFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ButtonFlexWrapper = styled.div`
  display: flex;
`;

const CreateUserText = styled.h5`
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
  4: 'Great job for completing the form. Please press the create user button to complete the process.',
};

export const CreateUser = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [image, setImage] = useState<File | EmptyString>(null);
  const [imageError, setImageError] = useState<{
    isError: boolean;
    message: string;
  } | null>(null);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const modelSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(9),
    passwordConfirmation: z.string().min(9),
    firstName: z.string(),
    lastName: z.string(),
    address: z.string().optional(),
    phone: z.coerce.number().optional(),
    gender: z.enum(['male', 'female', 'other', 'undisclosed']).optional(),
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
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
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
      formData.append(
        key,
        JSON.stringify(mutatedData[key as keyof IMutatedData])
      );
    }

    await createUser(formData);

    if (!isLoading) {
      navigate('/user-table');
    }
  };

  const openCreateUserModal = () => {
    setIsCreateUserModalOpen(true);
  };

  const closeCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
  };

  const changeImage: (image: File | EmptyString) => void = (image) => {
    setImage(image);
  };

  const applyError: (
    error: { isError: boolean; message: string } | null
  ) => void = (error) => {
    setImageError(error);
  };

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
          setFormStep((curr) => curr + 1);
        }
      } catch (error) {
        console.log(error);
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

  return (
    <CreateUserFlexWrapper>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormFlexWrapper>
            <CreateUserStepTracker formStep={formStep} />
            <CreateUserText>{TITLE[formStep]}</CreateUserText>
            {formStep === 0 && (
              <FlexWrapper>
                <StyledInput placeholder="Username" name="username" />
                <StyledInput placeholder="Email" name="email" />
                <PasswordInput name="password" placeholder="Password" />
                <PasswordInput
                  name="passwordConfirmation"
                  placeholder="Confirm password"
                />
              </FlexWrapper>
            )}
            {formStep === 1 && (
              <FlexWrapper>
                <StyledInput placeholder="firstName" name="firstName" />
                <StyledInput placeholder="lastName" name="lastName" />
                <StyledSelect {...register('gender')}>
                  <option>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="undisclosed">Undisclosed</option>
                </StyledSelect>
                {errors.gender?.message && <p>{errors.gender?.message}</p>}
                <StyledInput
                  placeholder="Date of birth"
                  type="date"
                  name="dateOfBirth"
                />
              </FlexWrapper>
            )}
            {formStep === 2 && (
              <FlexWrapper>
                <StyledInput placeholder="Address" name="address" />
                <StyledInput placeholder="Phone" type="number" name="phone" />
              </FlexWrapper>
            )}
            {formStep === 3 && (
              <ImageUpload
                name="image"
                fileSizeLimit={5 * MB_BYTES}
                image={image}
                changeImage={changeImage}
                error={imageError}
                applyError={applyError}
              />
            )}
            <ButtonFlexWrapper>
              {formStep !== 0 && <Button onClick={prevFormStep}>prev</Button>}
              {formStep !== 4 && <Button onClick={nextFormStep}>next</Button>}
              {formStep === 4 && (
                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={openCreateUserModal}
                >
                  Create User
                </Button>
              )}
            </ButtonFlexWrapper>
          </FormFlexWrapper>
          {isCreateUserModalOpen && (
            <StyledModal
              isModalOpen={isCreateUserModalOpen}
              closeModal={closeCreateUserModal}
              isLoading={isLoading}
            >
              Are you sure you want to create this user?
            </StyledModal>
          )}
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </CreateUserFlexWrapper>
  );
};
