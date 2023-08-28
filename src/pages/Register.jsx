import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import {
  Form,
  StyledInput,
  PasswordInput,
  Button,
  Select,
  StyledLink,
  ImageUploader,
  ImageUpload,
} from '../components/common';
import { useRegisterUserMutation } from '../redux/services/authApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

const FormFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ButtonFlexWrapper = styled.div`
  display: flex;
`;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const MB_BYTES = 1000000;

const TITLE = {
  0: 'Authentication Info',
  1: 'Personal Info',
  2: 'Shipping Info',
  3: 'Profile Photo',
  4: 'Great job for completing the form. Please press the register button to complete the registration.',
};

const Register = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState('');
  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();

  const modelSchema = z.object({
    username: z.string().min(9),
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

  const methods = useForm({
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

  const onSubmit = (data) => {
    if (!image) {
      return;
    }

    const mutatedData = { ...data, image };
    const formData = new FormData();

    for (const key in mutatedData) {
      formData.append(key, mutatedData[key]);
    }
    registerUser(formData);
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

  useEffect(() => {
    const currentUser = (state) => state.userState.user;
    if (!isLoading && isSuccess && currentUser) {
      navigate('/');
    }
  }, [isLoading, isSuccess, navigate]);

  console.log(errors);

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormFlexWrapper>
            <div>
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
              </ButtonFlexWrapper>
            </div>

            <h5>{TITLE[formStep]}</h5>
            {formStep === 0 && (
              <>
                <StyledInput placeholder="Username" name="username" />
                <StyledInput placeholder="Email" type="email" name="email" />
                <PasswordInput name="password" />
                <PasswordInput
                  name="passwordConfirmation"
                  placeholder="Confirm password"
                />
              </>
            )}
            {formStep === 1 && (
              <>
                <StyledInput placeholder="First Name" name="firstName" />
                <StyledInput placeholder="Last Name" name="lastName" />
                <Select {...register('gender')}>
                  <option>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="undisclosed">Undisclosed</option>
                </Select>
                {errors.gender?.message && <p>{errors.gender?.message}</p>}
                <StyledInput
                  placeholder="DateOfBirth"
                  type="date"
                  name="dateOfBirth"
                />
                {errors.dateOfBirth?.message && (
                  <p>{errors.dateOfBirth?.message}</p>
                )}
              </>
            )}
            {formStep === 2 && (
              <>
                <StyledInput placeholder="Address" name="address" />
                <StyledInput placeholder="Phone" name="phone" />
              </>
            )}
            {formStep === 3 && (
              <>
                <ImageUpload
                  name="image"
                  fileSizeLimit={5 * MB_BYTES}
                  image={image}
                  setImage={setImage}
                  error={imageError}
                  setError={setImageError}
                />
              </>
            )}
            {formStep === 4 && (
              <Button type="submit" disabled={isLoading}>
                Register
              </Button>
            )}
            <StyledLink to="/login">
              Have an account already? Log in instead!
            </StyledLink>
          </FormFlexWrapper>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </>
  );
};

export default Register;
