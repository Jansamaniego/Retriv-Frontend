import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ImageUploader, Form } from '../common';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useUpdateProfileImageMutation } from '../../redux/services/userApi';

const MB_BYTES = 1000000;

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
  const [changeProfileImageMode, setchangeProfileImageMode] = useState(false);

  const [changeprofileImage, { isLoading }] = useUpdateProfileImageMutation();

  const changeProfileImageSchema = z.object({
    image: z
      .any()
      .optional()
      .superRefine((f, ctx) => {
        if (f.size > 5 * MB_BYTES) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            type: 'array',
            message: `The file must not be larger than ${5 * MB_BYTES} bytes: ${
              f.size
            }`,
            maximum: 5 * MB_BYTES,
            inclusive: true,
          });
        }
      })
      .superRefine((f, ctx) => {
        if (f[0] instanceof File) {
        } else {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_type,
            message: `Given value does not hold a file type`,
          });
        }
      }),
  });

  const methods = useForm({ resolver: zodResolver(changeProfileImageSchema) });

  const { handleSubmit, control } = methods;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append({ image: data.image[0] });
    changeprofileImage(formData);
  };

  const onClickHandler = () => {
    setchangeProfileImageMode((value) => !value);
  };

  return (
    <ProfilePageHead>
      {changeProfileImageMode ? (
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ImageUploader name="image" />
            <Button type="submit" disabled={isLoading}>
              Change profile image
            </Button>
          </Form>

          <DevTool control={control} />
        </FormProvider>
      ) : (
        <img src={profileImage} alt="user profile" />
      )}
      <Button onClick={onClickHandler}>
        {changeProfileImageMode ? 'Upload' : 'Update image'}
      </Button>
      <div>
        <h1>{name}</h1>
        <h1>{email}</h1>
        <h1>{username}</h1>
      </div>
    </ProfilePageHead>
  );
};

export default ProfilePageHeader;
