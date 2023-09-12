import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment/moment';
import { useOutletContext } from 'react-router-dom';
import {
  Button,
  Card,
  StyledInput,
  StyledModal,
  StyledTextarea,
} from '../../../components/common';
import { z } from 'zod';
import { useUpdateDetailsMutation } from '../../../redux/services/myProfileApi';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { EditIcon } from '../../../assets/icons';
import { useUpdateUserMutation } from '../../../redux/services/userApi';
import { useSelector } from 'react-redux';

const genderOptions = ['male', 'female', 'other', 'undisclosed'];

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
`;

const UserDataInputFlexWrapper = styled.div`
  flex-direction: column;
`;

const Value = styled.h6`
  padding: 0.4rem 0.8rem;
`;

const EditIconButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  color: ${(props) =>
    props.disabled ? props.theme.neutral.light : props.theme.neutral.text};
  border: none;
  padding: 0;
  font: inherit;
  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};
  outline: inherit;
`;

const UserInfo = () => {
  const [user] = useOutletContext();
  const loggedInUser = useSelector((state) => state.userState.user);
  const [updateUser, { isLoading: adminUpdateIsLoading }] =
    useUpdateUserMutation();
  const [updateDetails, { isLoading: userUpdateIsLoading }] =
    useUpdateDetailsMutation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setisEditMode] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditFirstNameMode, setIsEditFirstNameMode] = useState(false);
  const [isEditLastNameMode, setIsEditLastNameMode] = useState(false);
  const [isEditUsernameMode, setIsEditUsernameMode] = useState(false);
  const [isEditEmailMode, setIsEditEmailMode] = useState(false);
  const [isEditGenderMode, setIsEditGenderMode] = useState(false);
  const [isEditPhoneMode, setIsEditPhoneMode] = useState(false);
  const [isEditDateOfBirthMode, setIsEditDateOfBirthMode] = useState(false);
  const [isEditAddressMode, setIsEditAddressMode] = useState(false);

  const { firstName, lastName, username, createdAt, gender, email, id } = user;

  let { address, dateOfBirth, phone } = user;

  useEffect(() => {
    const { role } = loggedInUser;
    setIsAdmin(role === 'admin');
  }, [loggedInUser]);

  console.log(user);

  const userInfoSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string().min(6),
    email: z.string().email(),
    phone: z.string().optional().nullable(),
    dateOfBirth: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    gender: z.enum(['male', 'female', 'other', 'undisclosed']).optional(),
  });

  if (!address) address = '';
  if (!dateOfBirth) dateOfBirth = null;
  if (!phone) phone = null;

  const methods = useForm({
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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const enableEditFirstNameMode = () => {
    setIsEditFirstNameMode(true);
    setisEditMode(true);
  };

  const disableEditFirstNameMode = () => {
    setIsEditFirstNameMode(false);
    setisEditMode(false);
  };

  const enableEditLastNameMode = () => {
    setIsEditLastNameMode(true);
    setisEditMode(true);
  };

  const disableEditLastNameMode = () => {
    setIsEditLastNameMode(false);
    setisEditMode(false);
  };

  const enableEditUsernameMode = () => {
    setIsEditUsernameMode(true);
    setisEditMode(true);
  };

  const disableEditUsernameMode = () => {
    setIsEditUsernameMode(false);
    setisEditMode(false);
  };

  const enableEditEmailMode = () => {
    setIsEditEmailMode(true);
    setisEditMode(true);
  };

  const disableEditEmailMode = () => {
    setIsEditEmailMode(false);
    setisEditMode(false);
  };

  const enableEditGenderMode = () => {
    setIsEditGenderMode(true);
    setisEditMode(true);
  };

  const disableEditGenderMode = () => {
    setIsEditGenderMode(false);
    setisEditMode(false);
  };

  const enableEditPhoneMode = () => {
    setIsEditPhoneMode(true);
    setisEditMode(true);
  };
  const disableEditPhoneMode = () => {
    setIsEditPhoneMode(false);
    setisEditMode(false);
  };

  const enableEditDateOfBirthMode = () => {
    setIsEditDateOfBirthMode(true);
    setisEditMode(true);
  };

  const disableEditDateOfBirthMode = () => {
    setIsEditDateOfBirthMode(false);
    setisEditMode(false);
  };

  const enableEditAddressMode = () => {
    setIsEditAddressMode(true);
    setisEditMode(true);
  };

  const disableEditAddressMode = () => {
    setIsEditAddressMode(false);
    setisEditMode(false);
  };

  const onSubmit = async (data) => {
    if (isAdmin) {
      await updateUser({
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        phone: Number(data.phone),
        id,
      });
    } else {
      await updateDetails({
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        phone: Number(data.phone),
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

  // const openModal = () => {
  //   setIsEditModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsEditModalOpen(false);
  // };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserInfoHeading>
            <h4>Update Info</h4>
          </UserInfoHeading>
          <UserData>
            {isEditFirstNameMode ? (
              <div>
                <label>
                  <h5>first name:</h5>
                </label>
                <UserDataInputFlexWrapper>
                  <StyledInput placeholder="First Name" name="firstName" />
                  <div>
                    <Button onClick={disableEditFirstNameMode}>Cancel</Button>
                    <Button type="submit">Update</Button>
                  </div>
                </UserDataInputFlexWrapper>
              </div>
            ) : (
              <div>
                <div>
                  <h5>first name:</h5>
                </div>
                <UserDataValueFlexWrapper>
                  <Value>{firstName}</Value>
                  {isAdmin && (
                    <EditIconButton
                      onClick={enableEditFirstNameMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  )}
                </UserDataValueFlexWrapper>
              </div>
            )}
            {isEditLastNameMode ? (
              <div>
                <label>
                  <h5>last name:</h5>
                </label>
                <UserDataInputFlexWrapper>
                  <StyledInput placeholder="Last Name" name="lastName" />
                  <div>
                    <Button onClick={disableEditLastNameMode}>Cancel</Button>
                    <Button type="submit">Update</Button>
                  </div>
                </UserDataInputFlexWrapper>
              </div>
            ) : (
              <div>
                <div>
                  <h5>last name:</h5>
                </div>
                <UserDataValueFlexWrapper>
                  <Value>{lastName}</Value>
                  {isAdmin && (
                    <EditIconButton
                      onClick={enableEditLastNameMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  )}
                </UserDataValueFlexWrapper>
              </div>
            )}
            {isEditUsernameMode ? (
              <div>
                <label>
                  <h5>username:</h5>
                </label>
                <UserDataInputFlexWrapper>
                  <StyledInput placeholder="Username" name="username" />
                  <div>
                    <Button onClick={disableEditUsernameMode}>Cancel</Button>
                    <Button type="submit">Update</Button>
                  </div>
                </UserDataInputFlexWrapper>
              </div>
            ) : (
              <div>
                <div>
                  <h5>username:</h5>
                </div>
                <UserDataValueFlexWrapper>
                  <Value>{username}</Value>
                  {isAdmin && (
                    <EditIconButton
                      onClick={enableEditUsernameMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  )}
                </UserDataValueFlexWrapper>
              </div>
            )}
            {isEditEmailMode ? (
              <div>
                <label>
                  <h5>email:</h5>
                </label>
                <UserDataInputFlexWrapper>
                  <StyledInput placeholder="Email" name="email" />
                  <div>
                    <Button onClick={disableEditEmailMode}>Cancel</Button>
                    <Button type="submit">Update</Button>
                  </div>
                </UserDataInputFlexWrapper>
              </div>
            ) : (
              <div>
                <div>
                  <h5>email:</h5>
                </div>
                <UserDataValueFlexWrapper>
                  <Value>{email}</Value>
                  {isAdmin && (
                    <EditIconButton
                      onClick={enableEditEmailMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  )}
                </UserDataValueFlexWrapper>
              </div>
            )}
            {isEditPhoneMode ? (
              <div>
                <label>
                  <h5>phone:</h5>
                </label>
                <UserDataInputFlexWrapper>
                  <StyledInput placeholder="Phone" name="phone" />
                  <div>
                    <Button onClick={disableEditPhoneMode}>Cancel</Button>
                    <Button type="submit">Update</Button>
                  </div>
                </UserDataInputFlexWrapper>
              </div>
            ) : (
              <div>
                <div>
                  <h5>phone:</h5>
                </div>
                <UserDataValueFlexWrapper>
                  <Value>{phone ? phone : 'N/A'}</Value>
                  {isAdmin && (
                    <EditIconButton
                      onClick={enableEditPhoneMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  )}
                </UserDataValueFlexWrapper>
              </div>
            )}
            {isEditDateOfBirthMode ? (
              <div>
                <label>
                  <h5>date of birth:</h5>
                </label>
                <UserDataInputFlexWrapper>
                  <StyledInput placeholder="Date of birth" name="dateOfBirth" />
                  <div>
                    <Button onClick={disableEditDateOfBirthMode}>Cancel</Button>
                    <Button type="submit">Update</Button>
                  </div>
                </UserDataInputFlexWrapper>
              </div>
            ) : (
              <div>
                <div>
                  <h5>date of birth:</h5>
                </div>
                <UserDataValueFlexWrapper>
                  <Value>{dateOfBirth ? dateOfBirth : 'N/A'}</Value>
                  {isAdmin && (
                    <EditIconButton
                      onClick={enableEditDateOfBirthMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  )}
                </UserDataValueFlexWrapper>
              </div>
            )}
            {isEditGenderMode ? (
              <div>
                <label>
                  <h5>gender:</h5>
                </label>
                <UserDataInputFlexWrapper>
                  <StyledInput placeholder="Gender" name="gender" />
                  <div>
                    <Button onClick={disableEditGenderMode}>Cancel</Button>
                    <Button type="submit">Update</Button>
                  </div>
                </UserDataInputFlexWrapper>
              </div>
            ) : (
              <div>
                <div>
                  <h5>gender:</h5>
                </div>
                <UserDataValueFlexWrapper>
                  <Value>{gender}</Value>
                  {isAdmin && (
                    <EditIconButton
                      onClick={enableEditGenderMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  )}
                </UserDataValueFlexWrapper>
              </div>
            )}
            {isEditAddressMode ? (
              <div>
                <label>
                  <h5>address:</h5>
                </label>
                <UserDataInputFlexWrapper>
                  <StyledInput placeholder="Address" name="address" />
                  <div>
                    <Button onClick={disableEditAddressMode}>Cancel</Button>
                    <Button type="submit">Update</Button>
                  </div>
                </UserDataInputFlexWrapper>
              </div>
            ) : (
              <div>
                <div>
                  <h5>address:</h5>
                </div>
                <UserDataValueFlexWrapper>
                  <Value>{address ? address : 'N/A'}</Value>
                  {isAdmin && (
                    <EditIconButton
                      onClick={enableEditAddressMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  )}
                </UserDataValueFlexWrapper>
              </div>
            )}
          </UserData>
          {/* {isEditModalOpen && (
            <StyledModal
              showModal={isEditModalOpen}
              closeModal={closeModal}
              isLoading={isLoading}
            >
              Are you sure you want to submit changes to user details?
            </StyledModal>
          )} */}
        </form>
        <DevTool control={control} />
      </FormProvider>
    </>
  );
};

export default UserInfo;
