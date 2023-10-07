import React, { forwardRef, Ref } from 'react';
import styled from 'styled-components';

interface ProfileImageLogoContainerProps {
  size: string;
}

interface ProfileImageLogoProps {
  profileImage: string;
  onClick?: () => void;
  size?: string;
}

const ProfileImageLogoContainer = styled.div<ProfileImageLogoContainerProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  position: relative;
  overflow: hidden;
  z-index: 0;
  border-radius: 50%;
`;

const ProfileImage = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: cover;

  &:active {
    outline: 0.1rem solid ${(props) => props.theme.neutral.main};
  }
`;

export const ProfileImageLogo = forwardRef<
  HTMLImageElement,
  ProfileImageLogoProps
>(({ profileImage, onClick, size = '4.5rem', ...props }, ref) => {
  return (
    <ProfileImageLogoContainer size={size}>
      <ProfileImage
        src={profileImage}
        alt="profile image logo"
        onClick={onClick}
        ref={ref}
      />
    </ProfileImageLogoContainer>
  );
});
