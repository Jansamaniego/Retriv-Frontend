import React from 'react';
import styled from 'styled-components';

const ProfileImageLogoContainer = styled.div`
  max-width: ${(props) => props.imageWidth};
  position: relative;
  height: 100%;
  display: flex;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  cursor: pointer;

  &:active {
    outline: 0.1rem solid ${(props) => props.theme.neutral.main};
  }
`;

const ProfileImageLogo = ({
  profileImage,
  onClick,
  imageWidth = '4rem',

  ...props
}) => {
  return (
    <ProfileImageLogoContainer imageWidth={imageWidth}>
      <ProfileImage
        src={profileImage}
        alt="profile image logo"
        onClick={onClick}
      />
    </ProfileImageLogoContainer>
  );
};

export default ProfileImageLogo;
