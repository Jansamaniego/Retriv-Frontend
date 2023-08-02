import React, { useRef, useState } from 'react';
import { StyledModal } from './StyledModal';
import { MdCloudUpload } from 'react-icons/md';
import styled from 'styled-components';
import { useUpdateProfileImageMutation } from '../../redux/services/myProfileApi';
import { Form } from './Form';
import { Button } from './Button';
import { z } from 'zod';

const UpdateImageModalFlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  border-radius: 50%;
  cursor: pointer;
`;

const Image = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 18rem;
  height: 18rem;
`;

const MB_BYTES = 1000000;

const UpdateProfileImageModal = ({ showModal, closeModal }) => {
  const [updateProfileImage, { isLoading, data }] =
    useUpdateProfileImageMutation();
  const inputRef = useRef();
  const [profileImage, setProfileImage] = useState('');

  const updateImageSchema = z.object({
    image: z
      .any()
      .optional()
      .superRefine((f, ctx) => {
        console.log(f);
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
        if (f instanceof File) {
        } else {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_type,
            message: `Given value does not hold a file type`,
          });
        }
      }),
  });

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const onChangeHandler = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(profileImage);
    const { image } = updateImageSchema.parse({ image: profileImage });
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    await updateProfileImage(formData);
    console.log(data);
  };

  return (
    <StyledModal
      showModal={showModal}
      closeModal={closeModal}
      withCloseButton={false}
      withButtons={false}
    >
      <UpdateImageModalFlexContainer>
        <Form onSubmit={onSubmitHandler}>
          <ImageContainer onClick={handleImageClick}>
            {profileImage ? (
              <Image src={URL.createObjectURL(profileImage)} alt="" />
            ) : (
              <MdCloudUpload color="#1475cf" size={150} />
            )}
            <input
              type="file"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={onChangeHandler}
            />
          </ImageContainer>
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </Form>
      </UpdateImageModalFlexContainer>
    </StyledModal>
  );
};

export default UpdateProfileImageModal;
