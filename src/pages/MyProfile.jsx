import React from 'react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  const user = useSelector((state) => state.userState.user);

  const {
    name,
    email,
    profileImage,
    profileImageId,
    isEmailVerified,
    shops,
    username,
    role,
    phone,
    gender,
    id,
    dateOfBirth,
    address,
  } = user;

  return user ? (
    <div>
      <h1>My Profie</h1>
      <h1>{name}</h1>
      <h1>{email}</h1>
      <img src={profileImage} alt="User profile" />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MyProfile;
