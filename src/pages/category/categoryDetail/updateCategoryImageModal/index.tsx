import React, { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { z } from 'zod';
import { MdCloudUpload } from 'react-icons/md';

import { StyledModal, Form, Button } from 'components/common';
import { useUpdateCategoryImageMutation } from 'redux/services/categoryApi/categoryApi';

interface IUpdateCategoryImageModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  id: string;
}

const UpdateImageModalFlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
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

const UpdateCategoryImageModal: React.FC<IUpdateCategoryImageModalProps> = ({
  isModalOpen,
  closeModal,
  id,
}) => {
  const [updateCategoryImage, { isLoading }] = useUpdateCategoryImageMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const updateImageSchema = z.object({
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
        if (f instanceof File) {
        } else {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_type,
            message: `Given value does not hold a file type`,
            expected: typeof File,
            received: typeof f,
          });
        }
      }),
  });

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const onChangeHandler = (event: ChangeEvent) => {
    let file: File | null = null;

    const files = (event.target as HTMLInputElement).files;

    if (files && files.length !== 0) {
      file = files[0];
    }

    setCategoryImage(file);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { image } = updateImageSchema.parse({ image: categoryImage });
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', image);
    await updateCategoryImage(formData);
    if (!isLoading) {
      closeModal();
    }
  };

  return (
    <StyledModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      withCloseButton={false}
      withButtons={false}
    >
      <UpdateImageModalFlexContainer>
        <Form onSubmit={onSubmitHandler}>
          <ImageContainer onClick={handleImageClick}>
            {categoryImage ? (
              <Image src={URL.createObjectURL(categoryImage)} alt="" />
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

export default UpdateCategoryImageModal;
