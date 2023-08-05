import React, { forwardRef } from 'react';
import styled from 'styled-components';

const ProfileImageLogoContainer = styled.div`
  max-width: ${(props) => props.imageWidth};
  position: relative;
  height: 100%;
  display: flex;
  z-index: 0;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  cursor: pointer;

  &:active {
    outline: 0.1rem solid ${(props) => props.theme.neutral.main};
  }
`;

const ProfileImageLogo = forwardRef(
  ({ profileImage, onClick, imageWidth = '4rem', ...props }, ref) => {
    return (
      <ProfileImageLogoContainer imageWidth={imageWidth}>
        <ProfileImage
          src={profileImage}
          alt="profile image logo"
          onClick={onClick}
          ref={ref}
        />
      </ProfileImageLogoContainer>
    );
  }
);

export default ProfileImageLogo;
