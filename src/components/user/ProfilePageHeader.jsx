import React from 'react';
import styled from 'styled-components';

const ProfilePageHead = styled.header`
  display: flex;
`;

const ProfilePageHeader = ({
  name,
  email,
  profileImage,
  username,
  ...props
}) => {
  console.log(name, email, profileImage, username);
  return (
    <ProfilePageHead>
      <img src={profileImage} alt="user profile" />
      <div>
        <h1>{name}</h1>
        <h1>{email}</h1>
        <h1>{username}</h1>
      </div>
    </ProfilePageHead>
  );
};

export default ProfilePageHeader;
