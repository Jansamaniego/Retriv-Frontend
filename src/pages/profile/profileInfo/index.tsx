import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';

import { RootState } from 'redux/store';
import { useUpdateDetailsMutation } from 'redux/services/myProfileApi/myProfileApi';
import {
  Select,
  StyledInput,
  StyledModal,
  StyledTextarea,
} from 'components/common';
import { EditIconButton } from 'components/common/editIconButton';
import GenderSelect from 'components/common/genderSelect';

interface IEditProfileModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  isLoading: boolean;
  isEditFirstNameMode: boolean;
  isEditLastNameMode: boolean;
  isEditUsernameMode: boolean;
  isEditEmailMode: boolean;
  isEditGenderMode: boolean;
  isEditPhoneMode: boolean;
  isEditDateOfBirthMode: boolean;
  isEditAddressMode: boolean;
}

interface FormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  gender: 'male' | 'female' | 'other' | 'undisclosed';
  dateOfBirth: string;
}

const UserInfoHeading = styled.div`
  grid-column: 1 / span 3;
`;

const UserData = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 0.8rem;
  column-gap: 1.6rem;
  padding: 1.6rem;

  @media (max-width: 910px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const UserDataValueFlexWrapper = styled.div`
  display: flex;
`;

const Value = styled.h6`
  padding: 0.4rem 0.8rem;
`;

const EditProfileModal: React.FC<IEditProfileModalProps> = ({
  isModalOpen,
  closeModal,
  isLoading,
  isEditFirstNameMode,
  isEditLastNameMode,
  isEditUsernameMode,
  isEditEmailMode,
  isEditGenderMode,
  isEditPhoneMode,
  isEditDateOfBirthMode,
  isEditAddressMode,
}) => {
  return (
    <StyledModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      isLoading={isLoading}
    >
      {isEditFirstNameMode && (
        <>
          <h4>First name</h4>
          <StyledInput
            placeholder="First Name"
            name="firstName"
            marginBottom={0}
          />
        </>
      )}
      {isEditLastNameMode && (
        <>
          <h4>Last name</h4>
          <StyledInput
            placeholder="Last Name"
            name="lastName"
            marginBottom={0}
          />
        </>
      )}
      {isEditUsernameMode && (
        <>
          <h4>Username</h4>
          <StyledInput
            placeholder="User Name"
            name="username"
            marginBottom={0}
          />
        </>
      )}
      {isEditEmailMode && (
        <>
          <h4>Email</h4>
          <StyledInput placeholder="Email" name="email" marginBottom={0} />
        </>
      )}
      {isEditGenderMode && (
        <>
          <h4>Gender</h4>
          <GenderSelect name="gender" />
        </>
      )}
      {isEditPhoneMode && (
        <>
          <h4>Phone</h4>
          <StyledInput placeholder="Phone" name="phone" marginBottom={0} />
        </>
      )}
      {isEditDateOfBirthMode && (
        <>
          <h4>Date of birth</h4>
          <StyledInput
            placeholder="Date of birth"
            type="date"
            name="dateOfBirth"
            marginBottom={0}
          />
        </>
      )}
      {isEditAddressMode && (
        <>
          <h4>Address</h4>
          <StyledTextarea placeholder="Address" name="address" />
        </>
      )}
    </StyledModal>
  );
};

const ProfileInfo = () => {
  const loggedInUser = useSelector((state: RootState) => state.userState.user);
  const [updateDetails, { isLoading }] = useUpdateDetailsMutation();

  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditFirstNameMode, setIsEditFirstNameMode] = useState(false);
  const [isEditLastNameMode, setIsEditLastNameMode] = useState(false);
  const [isEditUsernameMode, setIsEditUsernameMode] = useState(false);
  const [isEditEmailMode, setIsEditEmailMode] = useState(false);
  const [isEditGenderMode, setIsEditGenderMode] = useState(false);
  const [isEditPhoneMode, setIsEditPhoneMode] = useState(false);
  const [isEditDateOfBirthMode, setIsEditDateOfBirthMode] = useState(false);
  const [isEditAddressMode, setIsEditAddressMode] = useState(false);

  const { firstName, lastName, username, gender, email } = loggedInUser || {};

  let { address, dateOfBirth, phone } = loggedInUser || {};

  useEffect(() => {
    if (loggedInUser) {
      setIsLoggedInUser(true);
    }
  }, [loggedInUser]);

  const profileInfoSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string().min(6),
    email: z.string().email(),
    phone: z.string().optional().nullable(),
    dateOfBirth: z.coerce.string().optional().nullable(),
    address: z.string().optional().nullable(),
    gender: z.enum(['male', 'female', 'other', 'undisclosed']).optional(),
  });

  if (!address) address = '';
  if (!dateOfBirth) dateOfBirth = '';
  if (!phone) phone = '';

  const methods = useForm<FormValues>({
    defaultValues: {
      username,
      email,
      firstName,
      lastName,
      address,
      phone,
      gender,
      dateOfBirth: moment(dateOfBirth).format('yyyy-MM-DD'),
    },
    resolver: zodResolver(profileInfoSchema),
  });

  const { handleSubmit, control } = methods;

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);

    if (isEditFirstNameMode) setIsEditFirstNameMode(false);
    if (isEditLastNameMode) setIsEditLastNameMode(false);
    if (isEditUsernameMode) setIsEditUsernameMode(false);
    if (isEditEmailMode) setIsEditEmailMode(false);
    if (isEditGenderMode) setIsEditGenderMode(false);
    if (isEditPhoneMode) setIsEditPhoneMode(false);
    if (isEditDateOfBirthMode) setIsEditDateOfBirthMode(false);
    if (isEditAddressMode) setIsEditAddressMode(false);
  };

  const enableEditFirstNameMode = () => {
    setIsEditFirstNameMode(true);
    openEditModal();
  };

  const disableEditFirstNameMode = () => {
    setIsEditFirstNameMode(false);
    closeEditModal();
  };

  const enableEditLastNameMode = () => {
    setIsEditLastNameMode(true);
    openEditModal();
  };

  const disableEditLastNameMode = () => {
    setIsEditLastNameMode(false);
    closeEditModal();
  };

  const enableEditUsernameMode = () => {
    setIsEditUsernameMode(true);
    openEditModal();
  };

  const disableEditUsernameMode = () => {
    setIsEditUsernameMode(false);
    closeEditModal();
  };

  const enableEditEmailMode = () => {
    setIsEditEmailMode(true);
    openEditModal();
  };

  const disableEditEmailMode = () => {
    setIsEditEmailMode(false);
    closeEditModal();
  };

  const enableEditGenderMode = () => {
    setIsEditGenderMode(true);
    openEditModal();
  };

  const disableEditGenderMode = () => {
    setIsEditGenderMode(false);
    closeEditModal();
  };

  const enableEditPhoneMode = () => {
    setIsEditPhoneMode(true);
    openEditModal();
  };
  const disableEditPhoneMode = () => {
    setIsEditPhoneMode(false);
    closeEditModal();
  };

  const enableEditDateOfBirthMode = () => {
    setIsEditDateOfBirthMode(true);
    openEditModal();
  };

  const disableEditDateOfBirthMode = () => {
    setIsEditDateOfBirthMode(false);
    closeEditModal();
  };

  const enableEditAddressMode = () => {
    setIsEditAddressMode(true);
    openEditModal();
  };

  const disableEditAddressMode = () => {
    setIsEditAddressMode(false);
    closeEditModal();
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await updateDetails({
      ...data,
      dateOfBirth: new Date(data.dateOfBirth),
      phone: data.phone,
    });

    if (isEditFirstNameMode) return disableEditFirstNameMode();
    if (isEditLastNameMode) return disableEditLastNameMode();
    if (isEditUsernameMode) return disableEditUsernameMode();
    if (isEditEmailMode) return disableEditEmailMode();
    if (isEditPhoneMode) return disableEditPhoneMode();
    if (isEditGenderMode) return disableEditGenderMode();
    if (isEditDateOfBirthMode) return disableEditDateOfBirthMode();
    if (isEditAddressMode) return disableEditAddressMode();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserInfoHeading>
            <h4>Update Info</h4>
          </UserInfoHeading>
          <UserData>
            <div>
              <div>
                <h5>first name:</h5>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{firstName}</Value>
                {isLoggedInUser && (
                  <EditIconButton
                    buttonProps={{
                      onClick: enableEditFirstNameMode,
                      disabled: isEditModalOpen,
                    }}
                    svgProps={{ width: '2rem' }}
                  />
                )}
              </UserDataValueFlexWrapper>
            </div>
            <div>
              <div>
                <h5>last name:</h5>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{lastName}</Value>
                {isLoggedInUser && (
                  <EditIconButton
                    buttonProps={{
                      onClick: enableEditLastNameMode,
                      disabled: isEditModalOpen,
                    }}
                    svgProps={{ width: '2rem' }}
                  />
                )}
              </UserDataValueFlexWrapper>
            </div>
            <div>
              <div>
                <h5>username:</h5>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{username}</Value>
                {isLoggedInUser && (
                  <EditIconButton
                    buttonProps={{
                      onClick: enableEditUsernameMode,
                      disabled: isEditModalOpen,
                    }}
                    svgProps={{ width: '2rem' }}
                  />
                )}
              </UserDataValueFlexWrapper>
            </div>
            {!loggedInUser?.isGoogleAccount && (
              <div>
                <div>
                  <h5>email:</h5>
                </div>
                <UserDataValueFlexWrapper>
                  <Value>{email}</Value>
                  {isLoggedInUser && (
                    <EditIconButton
                      buttonProps={{
                        onClick: enableEditEmailMode,
                        disabled: isEditModalOpen,
                      }}
                      svgProps={{ width: '2rem' }}
                    />
                  )}
                </UserDataValueFlexWrapper>
              </div>
            )}
            <div>
              <div>
                <h5>phone:</h5>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{phone ? phone : 'N/A'}</Value>
                {isLoggedInUser && (
                  <EditIconButton
                    buttonProps={{
                      onClick: enableEditPhoneMode,
                      disabled: isEditModalOpen,
                    }}
                    svgProps={{ width: '2rem' }}
                  />
                )}
              </UserDataValueFlexWrapper>
            </div>
            <div>
              <div>
                <h5>date of birth:</h5>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{dateOfBirth ? dateOfBirth : 'N/A'}</Value>
                {isLoggedInUser && (
                  <EditIconButton
                    buttonProps={{
                      onClick: enableEditDateOfBirthMode,
                      disabled: isEditModalOpen,
                    }}
                    svgProps={{ width: '2rem' }}
                  />
                )}
              </UserDataValueFlexWrapper>
            </div>
            <div>
              <div>
                <h5>gender:</h5>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{gender}</Value>
                {isLoggedInUser && (
                  <EditIconButton
                    buttonProps={{
                      onClick: enableEditGenderMode,
                      disabled: isEditModalOpen,
                    }}
                    svgProps={{ width: '2rem' }}
                  />
                )}
              </UserDataValueFlexWrapper>
            </div>
            <div>
              <div>
                <h5>address:</h5>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{address ? address : 'N/A'}</Value>
                {isLoggedInUser && (
                  <EditIconButton
                    buttonProps={{
                      onClick: enableEditAddressMode,
                      disabled: isEditModalOpen,
                    }}
                    svgProps={{ width: '2rem' }}
                  />
                )}
              </UserDataValueFlexWrapper>
            </div>
          </UserData>
          {isEditModalOpen && (
            <EditProfileModal
              isModalOpen={isEditModalOpen}
              closeModal={closeEditModal}
              isLoading={isLoading}
              isEditFirstNameMode={isEditFirstNameMode}
              isEditLastNameMode={isEditLastNameMode}
              isEditUsernameMode={isEditUsernameMode}
              isEditEmailMode={isEditEmailMode}
              isEditGenderMode={isEditGenderMode}
              isEditPhoneMode={isEditPhoneMode}
              isEditDateOfBirthMode={isEditDateOfBirthMode}
              isEditAddressMode={isEditAddressMode}
            />
          )}
        </form>
        <DevTool control={control} />
      </FormProvider>
    </>
  );
};

export default ProfileInfo;
