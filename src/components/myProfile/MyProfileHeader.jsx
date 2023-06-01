import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ImageUploader, Form } from '../common';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useUpdateProfileImageMutation } from '../../redux/services/myProfileApi';
import {
  EditIcon,
  DateIcon,
  EmailIcon,
  ProductIcon,
  RatingsIcon,
  StoreIcon,
  UserIcon,
} from '../../assets/icons';

const MB_BYTES = 1000000;

const MyProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageFlexBoxWrapper = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  width: 15rem;
  max-width: 20rem;
  display: flex;

  & img {
    border-radius: 50%;
  }

  & .edit {
  }
`;

const EditButton = styled.button`
  box-shadow: none;
  border: none;
  display: inline-block;
  white-space: none;
  border-radius: 0.3rem;
  align-self: flex-end;
`;

const MyProfileDetailsContainer = styled.div`
  max-width: 170ch;
  width: 100%;
`;

const MyProfileDetails = styled.ul`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 5rem 5rem 5rem;
  list-style: none;
  margin: 0;
  padding: 0;

  & h5 {
    display: inline-block;
  }

  & li {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
  }
`;

const MyProfileHeader = ({
  name,
  email,
  profileImage,
  username,
  shops,
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
    formData.append('image', data.image[0]);
    changeprofileImage(formData);
  };

  const onClickHandler = () => {
    setchangeProfileImageMode((value) => !value);
  };

  return (
    <>
      <MyProfileImageContainer>
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
          <ImageFlexBoxWrapper>
            <ImageContainer>
              <img src={profileImage} alt="user profile" />
            </ImageContainer>
            {!changeProfileImageMode ? (
              <EditButton onClick={onClickHandler}>
                <EditIcon width="2rem" height="2rem" />
              </EditButton>
            ) : null}
          </ImageFlexBoxWrapper>
        )}
      </MyProfileImageContainer>
      <MyProfileDetailsContainer>
        <MyProfileDetails>
          <li>
            <UserIcon width="2rem" /> <h4>name: {name}</h4>
          </li>
          <li>
            <EmailIcon width="2rem" /> <h4>email: {email}</h4>
          </li>
          <li>
            <RatingsIcon width="2rem" /> <h4>ratings: 12k ratings</h4>
          </li>
          <li>
            <StoreIcon width="2rem" />
            <h4>
              shops:
              {shops && shops.length !== 0 ? shops.length : 0}
            </h4>
          </li>
          <li>
            <ProductIcon width="2rem" /> <h4>products: 540</h4>
          </li>
          <li>
            <DateIcon width="2rem" />
            <h4>date joined: feb 7 2020</h4>
          </li>
        </MyProfileDetails>
      </MyProfileDetailsContainer>
    </>
  );
};

export default MyProfileHeader;
