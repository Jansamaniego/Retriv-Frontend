import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { StyledModal } from '../styledModal';
import { MdCloudUpload } from 'react-icons/md';
import styled from 'styled-components';
import { useUpdateProfileImageMutation } from '../../../redux/services/myProfileApi/myProfileApi';
import { Form } from '../form';
import { Button } from '../button';
import { z } from 'zod';

type EmptyString = '' | null | undefined;

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
}

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

export const UpdateProfileImageModal: React.FC<Props> = ({
  isModalOpen,
  closeModal,
}) => {
  const [updateProfileImage, { isLoading, data }] =
    useUpdateProfileImageMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<File | EmptyString>('');

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
            message: 'Given value does not hold a file type',
            expected: typeof File,
            received: typeof f,
          });
        }
      }),
  });

  const handleImageClick = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.click();
  };

  const onChangeHandler = (event: ChangeEvent) => {
    let file: File | EmptyString;

    const files = (event.target as HTMLInputElement).files;

    if (files && files.length !== 0) {
      file = files[0];
    }

    setProfileImage(file);
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
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
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      withCloseButton={false}
      withButtons={false}
      isLoading={isLoading}
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
