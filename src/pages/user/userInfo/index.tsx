import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment/moment';
import { z } from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import { RootState } from 'redux/store';
import { useUpdateDetailsMutation } from 'redux/services/myProfileApi/myProfileApi';
import { useUpdateUserMutation } from 'redux/services/userApi/userApi';
import { StyledInput, StyledModal, StyledTextarea } from 'components/common';
import { useUser } from 'pages/profileLayout';
import { EditIconButton } from 'components/common/editIconButton';
import GenderSelect from 'components/common/genderSelect';

interface IEditUserModalProps {
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
  username: string;
  email: string;
  firstName: string;
  lastName: string;
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
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 0.8rem;
  column-gap: 1.6rem;
  padding: 1.6rem;
`;

const UserDataValueFlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const EditButtonWrapper = styled.div`
  display: flex;
`;

const Value = styled.h6`
  padding: 0.4rem 0.8rem;
`;

const UserInfoText = styled.h5`
  color: ${(props) => props.theme.neutral.text};
`;
const UserInfoSubText = styled.h4`
  color: ${(props) => props.theme.neutral.text};
`;

const EditUserModal: React.FC<IEditUserModalProps> = ({
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
          <UserInfoText>First name</UserInfoText>
          <StyledInput
            placeholder="First Name"
            name="firstName"
            marginBottom={0}
          />
        </>
      )}
      {isEditLastNameMode && (
        <>
          <UserInfoText>Last name</UserInfoText>
          <StyledInput
            placeholder="Last Name"
            name="lastName"
            marginBottom={0}
          />
        </>
      )}
      {isEditUsernameMode && (
        <>
          <UserInfoText>Username</UserInfoText>
          <StyledInput
            placeholder="User Name"
            name="username"
            marginBottom={0}
          />
        </>
      )}
      {isEditEmailMode && (
        <>
          <UserInfoText>Email</UserInfoText>
          <StyledInput placeholder="Email" name="email" marginBottom={0} />
        </>
      )}
      {isEditGenderMode && (
        <>
          <UserInfoText>Gender</UserInfoText>
          <GenderSelect name="gender" />
        </>
      )}
      {isEditPhoneMode && (
        <>
          <UserInfoText>Phone</UserInfoText>
          <StyledInput placeholder="Phone" name="phone" marginBottom={0} />
        </>
      )}
      {isEditDateOfBirthMode && (
        <>
          <UserInfoText>Date of birth</UserInfoText>
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
          <UserInfoText>Address</UserInfoText>
          <StyledTextarea placeholder="Address" name="address" />
        </>
      )}
    </StyledModal>
  );
};

const UserInfo = () => {
  const { user } = useUser();
  const loggedInUser = useSelector((state: RootState) => state.userState.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditFirstNameMode, setIsEditFirstNameMode] = useState(false);
  const [isEditLastNameMode, setIsEditLastNameMode] = useState(false);
  const [isEditUsernameMode, setIsEditUsernameMode] = useState(false);
  const [isEditEmailMode, setIsEditEmailMode] = useState(false);
  const [isEditGenderMode, setIsEditGenderMode] = useState(false);
  const [isEditPhoneMode, setIsEditPhoneMode] = useState(false);
  const [isEditDateOfBirthMode, setIsEditDateOfBirthMode] = useState(false);
  const [isEditAddressMode, setIsEditAddressMode] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [updateDetails] = useUpdateDetailsMutation();

  const { firstName, lastName, username, gender, email, id = '' } = user || {};

  let { address, dateOfBirth, phone } = user || {};

  useEffect(() => {
    const { role } = loggedInUser || {};
    setIsAdmin(role === 'admin');
  }, [loggedInUser]);

  const userInfoSchema = z.object({
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
    resolver: zodResolver(userInfoSchema),
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
    if (isAdmin) {
      await updateUser({
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        phone: data.phone,
        id,
      });
    } else {
      await updateDetails({
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        phone: data.phone,
      });
    }

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
            <UserInfoText>Update Info</UserInfoText>
          </UserInfoHeading>
          <UserData>
            <div>
              <div>
                <UserInfoSubText>first name:</UserInfoSubText>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{firstName}</Value>
                {isAdmin && (
                  <EditButtonWrapper>
                    <EditIconButton
                      buttonProps={{
                        onClick: enableEditFirstNameMode,
                        disabled: isEditModalOpen,
                      }}
                      svgProps={{ width: '2rem' }}
                    />
                  </EditButtonWrapper>
                )}
              </UserDataValueFlexWrapper>
            </div>
            <div>
              <div>
                <UserInfoSubText>last name:</UserInfoSubText>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{lastName}</Value>
                {isAdmin && (
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
                <UserInfoSubText>username:</UserInfoSubText>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{username}</Value>
                {isAdmin && (
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
            <div>
              <div>
                <UserInfoSubText>email:</UserInfoSubText>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{email}</Value>
                {isAdmin && (
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
            <div>
              <div>
                <UserInfoSubText>phone:</UserInfoSubText>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{phone ? phone : 'N/A'}</Value>
                {isAdmin && (
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
                <UserInfoSubText>date of birth:</UserInfoSubText>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{dateOfBirth ? dateOfBirth : 'N/A'}</Value>
                {isAdmin && (
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
                <UserInfoSubText>gender:</UserInfoSubText>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{gender}</Value>
                {isAdmin && (
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
                <UserInfoSubText>address:</UserInfoSubText>
              </div>
              <UserDataValueFlexWrapper>
                <Value>{address ? address : 'N/A'}</Value>
                {isAdmin && (
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
            <EditUserModal
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

export default UserInfo;
