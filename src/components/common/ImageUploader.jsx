import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { useFormContext, useController } from 'react-hook-form';

const StyledImageUploader = styled.input.attrs({
  type: 'file',
  accept:
    'image/jpeg, image/jpg, image/png, image/JPG, image/PNG, image/WEBP, image/webp',
})`
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
`;

export const ImageUploader = ({ name, initialImage, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext({});

  const file = watch(name);

  return (
    <>
      <StyledImageUploader {...register(name)} {...props}></StyledImageUploader>
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
