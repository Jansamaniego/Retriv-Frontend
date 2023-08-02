import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdCloudUpload } from 'react-icons/md';
import { useFormContext, useController } from 'react-hook-form';
import { StyledInput } from './StyledInput';

const StyledImageUploader = styled(StyledInput).attrs({
  type: 'file',
  accept:
    'image/jpeg, image/jpg, image/png, image/JPG, image/PNG, image/WEBP, image/webp',
})``;

export const ImageUploader = ({ name, initialImage, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext({});

  const file = watch(name);

  return (
    <>
      <StyledImageUploader {...register(name)} {...props} />
      {file && file[0] ? (
        <img
          src={file && file[0] ? URL.createObjectURL(file[0]) : null}
          alt={file[0]?.name}
          width={100}
          height={100}
        />
      ) : initialImage ? (
        <img src={initialImage} alt="user Profile" />
      ) : (
        <MdCloudUpload color="#1475cf" size={30} width={75} height={75} />
      )}
      {errors.image?.message && <p>{errors.image?.message}</p>}
    </>
  );
};
