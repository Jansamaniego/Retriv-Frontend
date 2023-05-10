import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';
import { Form, Input, Select, Button } from '../common';
import { useUpdateDetailsMutation } from '../../redux/services/userApi';

const genderOptions = ['male', 'female', 'other', 'undisclosed'];

const UpdateProfile = ({ user }) => {
  const [updateDetails, { isLoading }] = useUpdateDetailsMutation();

  const updateProfileSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    name: z.string(),
    address: z.string().optional().nullable(),
    phone: z.number().optional().nullable(),
    gender: z.enum(['male', 'female', 'other', 'undisclosed']).optional(),
    dateOfBirth: z.date().optional().nullable(),
  });

  const { username, email, name, gender } = user;

  let { address, dateOfBirth, phone } = user;

  if (!address) address = '';
  if (!dateOfBirth) dateOfBirth = null;
  if (!phone) phone = null;

  const methods = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username,
      email,
      name,
      address,
      phone,
      gender,
      dateOfBirth,
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => updateDetails(data);

  if (user) {
    return (
      <>
        <h1>Update profile</h1>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Username"
              type="text"
              {...register('username')}
            />
            {errors.username?.message && <p>{errors.username?.message}</p>}
            <Input placeholder="Email" type="email" {...register('email')} />
            {errors.email?.message && <p>{errors.email?.message}</p>}
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
              <option value={gender}>{gender}</option>
              {genderOptions.map((genderOption) => {
                if (genderOption === gender) return null;
                return (
                  <option value={genderOption} key={genderOption}>
                    {`${genderOption
                      .toString()
                      .charAt(0)
                      .toUpperCase()}${genderOption.slice(1)}`}
                  </option>
                );
              })}
            </Select>
            {errors.gender?.message && <p>{errors.gender?.message}</p>}
            <Input
              placeholder="DateOfBirth"
              type="date"
              {...register('dateOfBirth', { valueAsDate: true })}
            />
            {errors.dateOfBirth?.message && (
              <p>{errors.dateOfBirth?.message}</p>
            )}
            <Button type="submit" disabled={isLoading}>
              Update Profile
            </Button>
          </Form>
          <DevTool control={control} />
        </FormProvider>
      </>
    );
  }

  return <h1>Loading...</h1>;
};

export default UpdateProfile;
