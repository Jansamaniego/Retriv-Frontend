import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { IUser } from 'types';
import {
  useDeleteMyAccountMutation,
  useUpdateProfileImageMutation,
} from 'redux/services/myProfileApi/myProfileApi';
import {
  Card,
  Socials,
  StyledModal,
  UpdateProfileImageModal,
} from 'components/common';
import { EditIcon } from 'assets/icons';

interface ProfileHeaderProps {
  user: IUser;
}

const ProfileHeaderCard = styled(Card)`
  position: relative;
  padding: 0;
  margin-bottom: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColoredDiv = styled.div`
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.theme.secondary[700]},
    ${(props) => props.theme.secondary[600]}
  );
  min-height: 25rem;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
`;

const NormalDiv = styled.div`
  width: 100%;
  min-height: 12rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  position: relative;

  @media (max-width: 1030px) {
    display: flex;
    justify-content: center;
    min-height: 8rem;
  }
`;

const ProfileImageContainer = styled.div`
  position: absolute;
  left: 8rem;
  top: 16rem;

  @media (max-width: 1030px) {
    position: static;
    transform: translateY(-5rem);
  }
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  outline: 0.5rem solid ${(props) => props.theme.neutral[900]};
  object-fit: cover;
  width: 18rem;
  height: 18rem;
`;

const StyledEditIcon = styled(EditIcon)`
  position: absolute;
  cursor: pointer;
  right: 0.2rem;
  bottom: 0.05rem;
`;

const UserHeaderInfoFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.4rem 4rem 0 27rem;

  @media (max-width: 1030px) {
    margin: 0;
    width: 70%;
    transform: translateY(-3rem);
  }

  @media (max-width: 680px) {
    flex-direction: column;
    width: min-content;
    gap: 0.8rem;
  }

  @media (max-width: 600px) {
    flex-direction: row;
    width: 70%;
  }

  @media (max-width: 510px) {
    flex-direction: column;
    width: min-content;
  }
`;

const UserHeaderFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const UserHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const UserHeaderSubInfo = styled.div`
  @media (max-width: 680px) {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
`;

const UserHeaderInfoName = styled.h4`
  font-weight: 700;
`;
const UserHeaderInfoEmail = styled.h5`
  font-weight: 300;
`;
const UserHeaderInfoRole = styled.h5`
  font-weight: 300;
`;

const DeleteMyAccountHeader = styled.h5`
  font-weight: 300;
  margin: 0;
  padding-bottom: 1rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.primary.main};
  }
`;

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isDeleteMyAccountModalOpen, setIsDeleteMyAccountModalOpen] =
    useState(false);
  const [updateProfileImage, { isLoading }] = useUpdateProfileImageMutation();
  const [isProfileImageEditModalOpen, setIsProfileImageEditModalOpen] =
    useState(false);
  const [deleteMyAccount] = useDeleteMyAccountMutation();

  const { profileImage, firstName, lastName, email, role } = user;

  const openProfileImageEditModal = () => {
    setIsProfileImageEditModalOpen(true);
  };

  const closeProfileImageEditModal = () => {
    setIsProfileImageEditModalOpen(false);
  };

  const openDeleteMyAccountModal = () => {
    setIsDeleteMyAccountModalOpen(true);
  };

  const closeDeleteMyAccountModal = () => {
    setIsDeleteMyAccountModalOpen(false);
  };

  const deleteMyAccountOnClickHandler = async () => {
    await deleteMyAccount();
    if (!isLoading) {
      closeDeleteMyAccountModal();
      navigate('/');
    }
  };

  return (
    <ProfileHeaderCard>
      <ColoredDiv />
      <ProfileImageContainer>
        {profileImage ? <ProfileImage src={profileImage} /> : null}
        <StyledEditIcon width="2rem" onClick={openProfileImageEditModal} />
      </ProfileImageContainer>
      <NormalDiv>
        <UserHeaderInfoFlexContainer>
          <UserHeaderInfo>
            <div>
              <UserHeaderInfoName>
                {firstName} {lastName}
              </UserHeaderInfoName>
            </div>
            <UserHeaderSubInfo>
              <UserHeaderInfoEmail>{email}</UserHeaderInfoEmail>
              <UserHeaderInfoRole>{role}</UserHeaderInfoRole>
            </UserHeaderSubInfo>
          </UserHeaderInfo>
          <UserHeaderFlex>
            <Socials />
            <DeleteMyAccountHeader onClick={openDeleteMyAccountModal}>
              Delete My Account
            </DeleteMyAccountHeader>
          </UserHeaderFlex>
        </UserHeaderInfoFlexContainer>
      </NormalDiv>
      {isProfileImageEditModalOpen && (
        <UpdateProfileImageModal
          isModalOpen={isProfileImageEditModalOpen}
          closeModal={closeProfileImageEditModal}
        />
      )}
      {isDeleteMyAccountModalOpen && (
        <StyledModal
          isModalOpen={isDeleteMyAccountModalOpen}
          closeModal={closeDeleteMyAccountModal}
          onClick={deleteMyAccountOnClickHandler}
        >
          Are you sure you want to delete your account?
        </StyledModal>
      )}
    </ProfileHeaderCard>
  );
};

export default ProfileHeader;
