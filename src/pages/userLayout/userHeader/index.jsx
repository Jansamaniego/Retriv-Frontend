import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {
  Button,
  Card,
  Socials,
  StyledModal,
  UpdateProfileImageModal,
} from '../../../components/common';
import { EditIcon } from '../../../assets/icons';
import { useUpdateProfileImageMutation } from '../../../redux/services/myProfileApi';

const ProfileHeaderCard = styled(Card)`
  position: relative;
  padding: 0;
  margin-bottom: 3.2rem;
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
  min-height: 16rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  position: relative;
`;

const ProfileImageContainer = styled.div`
  position: absolute;
  left: 8rem;
  bottom: 4rem;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  outline: 0.5rem solid ${(props) => props.theme.neutral[900]};
  object-fit: cover;
  position: relative;
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
`;

const UserHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const UserHeaderSubInfo = styled.div``;

const UserHeaderInfoName = styled.h4`
  font-weight: 700;
`;
const UserHeaderInfoEmail = styled.h5`
  font-weight: 300;
`;
const UserHeaderInfoRole = styled.h5`
  font-weight: 300;
`;

const UserHeader = ({ user }) => {
  const [isProfileImageEditModalOpen, setIsProfileImageEditModalOpen] =
    useState(false);

  const { profileImage, name, email, role } = user;

  const openProfileImageEditModal = () => {
    setIsProfileImageEditModalOpen(true);
  };

  const closeProfileImageEditModal = () => {
    setIsProfileImageEditModalOpen(false);
  };

  return (
    <ProfileHeaderCard>
      <ColoredDiv />
      <NormalDiv>
        <ProfileImageContainer>
          {profileImage ? <ProfileImage src={profileImage} /> : null}
          <StyledEditIcon width="2rem" onClick={openProfileImageEditModal} />
        </ProfileImageContainer>
        <UserHeaderInfoFlexContainer>
          <UserHeaderInfo>
            <div>
              <UserHeaderInfoName>{name}</UserHeaderInfoName>
            </div>
            <UserHeaderSubInfo>
              <UserHeaderInfoEmail>{email}</UserHeaderInfoEmail>
              <UserHeaderInfoRole>{role}</UserHeaderInfoRole>
            </UserHeaderSubInfo>
          </UserHeaderInfo>
          <Socials />
        </UserHeaderInfoFlexContainer>
      </NormalDiv>
      {isProfileImageEditModalOpen && (
        <UpdateProfileImageModal
          showModal={openProfileImageEditModal}
          closeModal={closeProfileImageEditModal}
        />
      )}
    </ProfileHeaderCard>
  );
};

export default UserHeader;
