import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';
import { Form, Input, Select, Button } from '../common';
import { useUpdateDetailsMutation } from '../../redux/services/userApi';
import styled from 'styled-components';

const genderOptions = ['male', 'female', 'other', 'undisclosed'];

const UserData = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 2.4rem;
  & input {
    margin-bottom: 2.4rem;
  }
`;

const StyledInput = styled(Input)`
  font-size: 2rem;
  font-weight: 400;
`;

const UserInfoHeading = styled.div`
  grid-column: 1 / span 3;
`;
const UpdateInfoHeading = styled.div`
  grid-column: 1 / span 3;
  padding-bottom: 2.8rem;
`;

const Value = styled.h5`
  margin-left: 1rem;
`;

const ButtonGridCell = styled.div`
  grid-column: 2/4;
  display: flex;
  align-items: center;
  margin-left: 1.6rem;
`;

const MyProfileInfo = ({ user }) => {
  const [updateDetails, { isLoading }] = useUpdateDetailsMutation();
  const [editMode, setEditMode] = useState(false);

  const myProfileInfoSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    phone: z.number().optional().nullable(),
    dateOfBirth: z.date().optional().nullable(),
    address: z.string().optional().nullable(),
    gender: z.enum(['male', 'female', 'other', 'undisclosed']).optional(),
  });

  const { username, email, name, gender } = user;

  let { address, dateOfBirth, phone } = user;

  if (!address) address = '';
  if (!dateOfBirth) dateOfBirth = null;
  if (!phone) phone = null;

  const methods = useForm({
    resolver: zodResolver(myProfileInfoSchema),
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

  const enableEditMode = () => {
    setEditMode(true);
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  const onSubmit = (data) => updateDetails(data);

  if (user) {
    if (editMode) {
      return (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <UserData>
              <UpdateInfoHeading>
                <h5>Update Info</h5>
              </UpdateInfoHeading>
              <div>
                <label>
                  <h5>name:</h5>
                </label>
                <Value>
                  <StyledInput
                    placeholder="name"
                    type="text"
                    {...register('name')}
                  />
                </Value>
                {errors.name?.message && <p>{errors.name?.message}</p>}
              </div>
              <div>
                <label>
                  <h5>username:</h5>
                </label>
                <Value>
                  <StyledInput
                    placeholder="Username"
                    type="text"
                    {...register('username')}
                  />
                </Value>
                {errors.username?.message && <p>{errors.username?.message}</p>}
              </div>
              <div>
                <label>
                  <h5>email:</h5>
                </label>
                <Value>
                  <StyledInput
                    placeholder="Email"
                    type="text"
                    {...register('email')}
                  />
                </Value>
                {errors.email?.message && <p>{errors.email?.message}</p>}
              </div>
              <div>
                <label>
                  <h5>phone:</h5>
                </label>
                <Value>
                  <StyledInput
                    placeholder="Phone"
                    type="text"
                    {...register('phone')}
                  />
                </Value>
                {errors.phone?.message && <p>{errors.phone?.message}</p>}
              </div>
              <div>
                <label>
                  <h5>Date of birth:</h5>
                </label>
                <Value>
                  <StyledInput
                    placeholder="Date of birth"
                    type="text"
                    {...register('dateOfBirth')}
                  />
                </Value>
                {errors.dateOfBirth?.message && (
                  <p>{errors.dateOfBirth?.message}</p>
                )}
              </div>
              <div>
                <label>
                  <h5>address:</h5>
                </label>
                <Value>
                  <StyledInput
                    placeholder="Address"
                    type="text"
                    {...register('address')}
                  />
                </Value>
                {errors.address?.message && <p>{errors.address?.message}</p>}
              </div>
              <div>
                <label>
                  <h5>gender:</h5>
                </label>
                <Value>
                  <StyledInput
                    placeholder="Gender"
                    type="text"
                    {...register('gender')}
                  />
                </Value>
                {errors.gender?.message && <p>{errors.gender?.message}</p>}
              </div>
              <ButtonGridCell>
                <div>
                  <Button onClick={disableEditMode}>Cancel</Button>
                  <Button type="submit" disabled={isLoading}>
                    Update
                  </Button>
                </div>
              </ButtonGridCell>
            </UserData>
          </form>
          <DevTool control={control} />
        </FormProvider>
      );
    } else {
      return (
        <UserData>
          <UserInfoHeading>
            <h5>User Info</h5>
          </UserInfoHeading>
          <div>
            <label>
              <h5>name:</h5>
            </label>
            <Value>{name}</Value>
          </div>
          <div>
            <label>
              <h5>username:</h5>
            </label>
            <Value>{username}</Value>
          </div>
          <div>
            <label>
              <h5>email:</h5>
            </label>
            <Value>{email}</Value>
          </div>
          <div>
            <label>
              <h5>phone:</h5>
            </label>
            <Value>{phone ? phone : 'N/A'}</Value>
          </div>
          <div>
            <label>
              <h5>Date of birth:</h5>
            </label>
            <Value>{dateOfBirth ? dateOfBirth : 'N/A'}</Value>
          </div>
          <div>
            <label>
              <h5>address:</h5>
            </label>
            <Value>{address ? address : 'N/A'}</Value>
          </div>
          <div>
            <label>
              <h5>gender</h5>
            </label>
            <Value>{gender}</Value>
          </div>
          <ButtonGridCell>
            <div>
              <Button onClick={enableEditMode} secondary>
                Edit
              </Button>
            </div>
          </ButtonGridCell>
        </UserData>
      );
    }
  }

  return <h1>Loading...</h1>;
};

export default MyProfileInfo;
