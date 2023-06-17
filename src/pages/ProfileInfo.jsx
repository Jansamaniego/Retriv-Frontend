import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOutletContext } from 'react-router-dom';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';
import {
  StyledInput,
  Button,
  Card,
  StyledTextarea,
} from '../components/common';
import { useUpdateDetailsMutation } from '../redux/services/myProfileApi';
import styled from 'styled-components';
import moment from 'moment/moment';
import StyledModal from '../components/common/StyledModal';

const genderOptions = ['male', 'female', 'other', 'undisclosed'];

const UserDataGridContainer = styled.main``;

const UserData = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 0.8rem;
  column-gap: 1.6rem;
  padding: 1.6rem;
`;

const UserInfoHeading = styled.div`
  grid-column: 1 / span 3;
`;

const Value = styled.h5`
  margin-left: 1rem;
  padding: 0.4rem 0.8rem;
`;

const ButtonGridCell = styled.div`
  grid-column: 2/4;
  display: flex;
  align-items: center;
  margin-left: 1.6rem;
`;

const ProfileInfo = () => {
  const [updateDetails, { isLoading }] = useUpdateDetailsMutation();
  const [isEditMode, setisEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user] = useOutletContext();

  const profileInfoSchema = z.object({
    name: z.string(),
    username: z.string().min(6),
    email: z.string().email(),
    phone: z.string().optional().nullable(),
    dateOfBirth: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    gender: z.enum(['male', 'female', 'other', 'undisclosed']).optional(),
  });

  const { username, email, name, gender } = user;

  let { address, dateOfBirth, phone } = user;

  if (!address) address = '';
  if (!dateOfBirth) dateOfBirth = null;
  if (!phone) phone = null;

  const methods = useForm({
    defaultValues: {
      username,
      email,
      name,
      address,
      phone,
      gender,
      dateOfBirth: moment(dateOfBirth).format('yyyy-MM-DD'),
    },
    resolver: zodResolver(profileInfoSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const enableEditMode = () => {
    setisEditMode(true);
  };

  const disableEditMode = () => {
    setisEditMode(false);
  };

  const onSubmit = (data) =>
    updateDetails({
      dateOfBirth: new Date(data.dateOfBirth),
      phone: Number(data.phone),
      ...data,
    });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (user) {
    if (isEditMode) {
      return (
        <Card>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <UserInfoHeading>
                <h4>Update Info</h4>
              </UserInfoHeading>
              <UserData>
                <div>
                  <label>
                    <h5>name:</h5>
                  </label>
                  <StyledInput placeholder="Name" name="name" />
                </div>
                <div>
                  <label>
                    <h5>username:</h5>
                  </label>
                  <StyledInput placeholder="Username" name="username" />
                </div>
                <div>
                  <label>
                    <h5>email:</h5>
                  </label>
                  <StyledInput placeholder="Email" type="email" name="email" />
                </div>
                <div>
                  <label>
                    <h5>phone:</h5>
                  </label>
                  <StyledInput placeholder="Phone" type="number" name="phone" />
                </div>
                <div>
                  <label>
                    <h5>Date of birth:</h5>
                  </label>
                  <StyledInput
                    placeholder="Date of birth"
                    type="date"
                    name="dateOfBirth"
                  />
                </div>
                <div>
                  <label>
                    <h5>gender:</h5>
                  </label>
                  <StyledInput placeholder="Gender" type="text" name="gender" />
                </div>
                <div>
                  <label>
                    <h5>address:</h5>
                  </label>
                  <StyledTextarea placeholder="Address" name="address" />
                </div>
                <ButtonGridCell>
                  <div>
                    <Button type="button" onClick={disableEditMode}>
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={openModal}
                      disabled={Object.keys(errors).length !== 0}
                    >
                      Update
                    </Button>
                  </div>
                </ButtonGridCell>
              </UserData>
              <StyledModal
                showModal={showModal}
                closeModal={closeModal}
                isLoading={isLoading}
              >
                Are you sure you want to submit changes to user details?
              </StyledModal>
            </form>
            <DevTool control={control} />
          </FormProvider>
        </Card>
      );
    } else {
      return (
        <Card>
          <UserDataGridContainer>
            <UserInfoHeading>
              <h4>User Info</h4>
            </UserInfoHeading>
            <UserData>
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
                <Value>
                  {dateOfBirth
                    ? moment(dateOfBirth).format('DD/MM/yyyy')
                    : 'N/A'}
                </Value>
              </div>
              <div>
                <label>
                  <h5>gender</h5>
                </label>
                <Value>{gender}</Value>
              </div>
              <div>
                <label>
                  <h5>address:</h5>
                </label>
                <Value>{address ? address : 'N/A'}</Value>
              </div>
              <ButtonGridCell>
                <div>
                  <Button onClick={enableEditMode} secondary>
                    Edit
                  </Button>
                </div>
              </ButtonGridCell>
            </UserData>
          </UserDataGridContainer>
        </Card>
      );
    }
  }

  return <h1>Loading...</h1>;
};

export default ProfileInfo;
