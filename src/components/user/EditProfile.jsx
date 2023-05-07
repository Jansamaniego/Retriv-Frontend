import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const EditProfile = ({ user }) => {
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

  return <div>EditProfile</div>;
};

export default EditProfile;
