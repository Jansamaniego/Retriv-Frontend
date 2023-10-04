import React, { useRef, useState } from 'react';
import { StyledModal, Form, Button } from '../common';
import { MdCloudUpload } from 'react-icons/md';
import styled from 'styled-components';

import { z } from 'zod';
import { useUpdateShopImageMutation } from '../../redux/services/shopApi/shopApi';
import {
  useAddProductImagesMutation,
  useUpdateProductMainImageMutation,
} from '../../redux/services/productApi/productApi';

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

const AddProductImagesModal = ({
  showModal,
  closeModal,
  shopId,
  productId,
}) => {
  const [addProductImages, { isLoading, data }] = useAddProductImagesMutation();

  const inputRef = useRef();

  const [productImages, setProductImages] = useState([]);

  const addProductImagesSchema = z.object({
    images: z
      .any()
      .superRefine((f, ctx) => {
        for (const file of f) {
          if (file.size > 5 * MB_BYTES) {
            ctx.addIssue({
              code: z.ZodIssueCode.too_big,
              type: 'array',
              message: `The file must not be larger than ${
                5 * MB_BYTES
              } bytes: ${file.size}`,
              maximum: 5 * MB_BYTES,
              inclusive: true,
            });
          }
        }
      })
      .superRefine((f, ctx) => {
        for (const file of f) {
          if (file instanceof File) {
          } else {
            ctx.addIssue({
              code: z.ZodIssueCode.invalid_type,
              message: `Given value does not hold a file type`,
            });
          }
        }
      }),
  });

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const onChangeHandler = (event) => {
    const files = event.target.files;
    setProductImages(files);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log('hey');
    const { images } = addProductImagesSchema.parse({
      images: productImages,
    });
    console.log(images);
    const formData = new FormData();
    formData.append('shopId', shopId);
    formData.append('productId', productId);
    for (let i = 0; i < images.length; i++) {
      console.log(images[i]);
      formData.append('images', images[i]);
    }
    await addProductImages(formData);
    closeModal();
  };

  console.log(productImages);

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
            {productImages.length !== 0 ? (
              Array.from(productImages).map((productImage, idx) => (
                <Image
                  src={URL.createObjectURL(productImage)}
                  alt=""
                  key={idx}
                />
              ))
            ) : (
              <MdCloudUpload color="#1475cf" size={150} />
            )}
            <input
              type="file"
              multiple="multiple"
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

export default AddProductImagesModal;
