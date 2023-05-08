import React from 'react';

const UserDetails = ({ user }) => {
  const {
    address,
    dateOfBirth,
    gender,
    phone,
    profileImage,
    profileImageId,
    role,
    shops,
  } = user;
  return (
    <div>
      <h1>{address}</h1>
      <h1>{dateOfBirth}</h1>
      <h1>{}</h1>
      <h1>{}</h1>
      <h1>{}</h1>
    </div>
  );
};

export default UserDetails;
