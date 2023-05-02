import React from 'react';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  Input,
  PasswordInput,
  Button,
  Select,
} from '../components/common';
import { useRegisterUserMutation } from '../redux/services/authApi';
import { DevTool } from '@hookform/devtools';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const registerSchema = z
    .object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(9),
      confirmPassword: z.string().min(9),
      name: z.string(),
      address: z.string().optional(),
      phone: z.number().optional(),
      gender: z.enum(['male', 'female', 'other', 'undisclosed']).optional(),
      dateOfBirth: z.date().optional(),
    })
    .refine((data) => passwordRegex.test(data.password), {
      message:
        'Passwords must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      path: ['password'],
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
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

  return (
    <>
      <h1>Register</h1>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit((data) => registerUser(data))}>
          <Input placeholder="Username" type="text" {...register('username')} />
          {errors.username?.message && <p>{errors.username?.message}</p>}
          <Input placeholder="Email" type="email" {...register('email')} />
          {errors.email?.message && <p>{errors.email?.message}</p>}
          <PasswordInput name="password" />
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm password"
          />
          <Input placeholder="name" type="text" {...register('name')} />
          {errors.name?.message && <p>{errors.name?.message}</p>}
          <Input placeholder="Address" type="text" {...register('address')} />
          {errors.address?.message && <p>{errors.address?.message}</p>}
          <Input
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
          <Input
            placeholder="DateOfBirth"
            type="date"
            {...register('dateOfBirth', { valueAsDate: true })}
          />
          {errors.dateOfBirth?.message && <p>{errors.dateOfBirth?.message}</p>}
          <Button type="submit">Register</Button>
        </Form>
        <DevTool control={control} />
      </FormProvider>
    </>
  );
};

export default Register;
