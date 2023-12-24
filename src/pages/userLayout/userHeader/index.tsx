import React, { useState } from 'react';
import styled from 'styled-components';

import { IUser } from 'types';
import { Card, Socials, UpdateProfileImageModal } from 'components/common';
import { EditIconButton } from 'components/common/editIconButton';

interface IUserHeaderProps {
  user: IUser;
}

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

const EditButtonWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
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

const UserHeaderInfoName = styled.h4`
  font-weight: 700;
`;
const UserHeaderInfoEmail = styled.h5`
  font-weight: 300;
`;
const UserHeaderInfoRole = styled.h5`
  font-weight: 300;
`;

const UserHeader: React.FC<IUserHeaderProps> = ({ user }) => {
  const [isProfileImageEditModalOpen, setIsProfileImageEditModalOpen] =
    useState(false);

  const { profileImage, firstName, lastName, email, role } = user;

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
          {profileImage && <ProfileImage src={profileImage} />}
          <EditButtonWrapper>
            <EditIconButton
              buttonProps={{ onClick: openProfileImageEditModal }}
              svgProps={{ width: '2rem' }}
            />
          </EditButtonWrapper>
        </ProfileImageContainer>
        <UserHeaderInfoFlexContainer>
          <UserHeaderInfo>
            <div>
              <UserHeaderInfoName>
                {firstName} {lastName}
              </UserHeaderInfoName>
            </div>
            <div>
              <UserHeaderInfoEmail>{email}</UserHeaderInfoEmail>
              <UserHeaderInfoRole>{role}</UserHeaderInfoRole>
            </div>
          </UserHeaderInfo>
          <Socials />
        </UserHeaderInfoFlexContainer>
      </NormalDiv>
      {isProfileImageEditModalOpen && (
        <UpdateProfileImageModal
          isModalOpen={isProfileImageEditModalOpen}
          closeModal={closeProfileImageEditModal}
        />
      )}
    </ProfileHeaderCard>
  );
};

export default UserHeader;
