import React from 'react';
import z from 'zod';
import {
  Form,
  StyledInput,
  PasswordInput,
  Button,
  Select,
  StyledLink,
  ImageUploader,
  Card,
} from '../components/common';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { useCreateUserMutation } from '../redux/services/userApi';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const MB_BYTES = 1000000;

const CreateUserPage = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const registerSchema = z
    .object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(9),
      passwordConfirmation: z.string().min(9),
      firstName: z.string(),
      lastName: z.string(),
      address: z.string().optional(),
      phone: z.number().optional(),
      gender: z.enum(['male', 'female', 'other', 'undisclosed']).optional(),
      dateOfBirth: z.date().optional(),
      image: z
        .any()
        .optional()
        .superRefine((f, ctx) => {
          if (f.size > 5 * MB_BYTES) {
            ctx.addIssue({
              code: z.ZodIssueCode.too_big,
              type: 'array',
              message: `The file must not be larger than ${
                5 * MB_BYTES
              } bytes: ${f.size}`,
              maximum: 5 * MB_BYTES,
              inclusive: true,
            });
          }
        })
        .superRefine((f, ctx) => {
          if (f[0] instanceof File) {
          } else {
            ctx.addIssue({
              code: z.ZodIssueCode.invalid_type,
              message: `Given value does not hold a file type`,
            });
          }
        }),
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
  const methods = useForm({
    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    const mutatedData = { ...data, image: data.image[0] };
    const formData = new FormData();

    for (const key in mutatedData) {
      formData.append(key, mutatedData[key]);
    }
    createUser(formData);
  };

  return (
    <Card>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            placeholder="Username"
            type="text"
            {...register('username')}
          />
          {errors.username?.message && <p>{errors.username?.message}</p>}
          <StyledInput
            placeholder="Email"
            type="email"
            {...register('email')}
          />
          {errors.email?.message && <p>{errors.email?.message}</p>}
          <PasswordInput name="password" />
          <PasswordInput
            name="passwordConfirmation"
            placeholder="Confirm password"
          />
          <StyledInput
            placeholder="firstName"
            type="text"
            {...register('firstName')}
          />
          <StyledInput
            placeholder="lastName"
            type="text"
            {...register('lastName')}
          />
          {errors.name?.message && <p>{errors.name?.message}</p>}
          <StyledInput
            placeholder="Address"
            type="text"
            {...register('address')}
          />
          {errors.address?.message && <p>{errors.address?.message}</p>}
          <StyledInput
            placeholder="Phone"
            type="number"
            {...register('phone', { valueAsNumber: true })}
          />
          {errors.phone?.message && <p>{errors.phone?.message}</p>}
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
            {...register('dateOfBirth', { valueAsDate: true })}
          />
          {errors.dateOfBirth?.message && <p>{errors.dateOfBirth?.message}</p>}
          <ImageUploader name="image" />
          <Button type="submit" disabled={isLoading}>
            Create User
          </Button>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </Card>
  );
};

export default CreateUserPage;
