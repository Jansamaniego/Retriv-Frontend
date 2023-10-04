import React, { useRef, useState } from 'react';
import { StyledModal, Form, Button } from '../../../../components/common';
import { MdCloudUpload } from 'react-icons/md';
import styled from 'styled-components';

import { z } from 'zod';
import { useUpdateShopImageMutation } from '../../../../redux/services/shopApi/shopApi';
import { useUpdateProductMainImageMutation } from '../../../../redux/services/productApi/productApi';

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

const UpdateProductMainImageModal = ({
  showModal,
  closeModal,
  shopId,
  productId,
}) => {
  const [updateProductMainImage, { isLoading, data }] =
    useUpdateProductMainImageMutation();

  const inputRef = useRef();

  const [productMainImage, setProductMainImage] = useState('');

  const updateProductMainImageSchema = z.object({
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
          });
        }
      }),
  });

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const onChangeHandler = (event) => {
    const file = event.target.files[0];
    setProductMainImage(file);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { image } = updateProductMainImageSchema.parse({
      image: productMainImage,
    });
    const formData = new FormData();
    formData.append('shopId', shopId);
    formData.append('productId', productId);
    formData.append('image', image);
    await updateProductMainImage(formData);
    closeModal();
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
            {productMainImage ? (
              <Image src={URL.createObjectURL(productMainImage)} alt="" />
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

export default UpdateProductMainImageModal;
