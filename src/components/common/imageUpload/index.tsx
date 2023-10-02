import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import styled from 'styled-components';

type EmptyString = '' | null | undefined;

interface ImageUploadProps {
  name: string;
  multiple: boolean;
  image: File;
  changeImage: (image: File | EmptyString) => void;
  images: File[] | [];
  changeImages: (images: File[] | []) => void;
  error: {
    isError: boolean;
    message: string;
  } | null;
  applyError: (error: { isError: boolean; message: string }) => void;
  fileSizeLimit: number;
}

export const ImageUploadContainer = styled.div`
  padding: 1.6rem;
  border: 1px solid ${(props) => props.theme.neutral.main};
  border-radius: 0.5rem;
  cursor: pointer;
`;

const MainImage = styled.img`
  height: 15rem;
  width: 25rem;
  object-fit: fill;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.neutral.main};
`;

const ImagesPreviewContainer = styled.div`
  width: 100%;
`;

const ImagesPreviewFlexWrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
`;

const ImagesContainer = styled.div`
  padding: 0.8rem;
`;

const Image = styled.img`
  height: 10rem;
  width: 25rem;
  object-fit: fill;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.neutral.main};
`;

export const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  multiple,
  image = null,
  changeImage,
  images = [],
  changeImages,
  error,
  applyError,
  fileSizeLimit,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [isError, setIsError] = useState(false);

  const handleImageClick = () => {
    const inputElement = inputRef.current;

    if (!inputElement) {
      return;
    }

    inputElement.click();
  };

  const handleImageChange = async (event: ChangeEvent) => {
    if (multiple) {
      const files = (event.target as HTMLInputElement).files;

      const imagesArray = Array.from(files || []).map((file) => file);

      if (imagesArray.length === 0) {
        applyError({
          isError: true,
          message: 'Product sub image/s is/are required',
        });
        changeImages([]);
        return;
      }

      const sizeLimitCheck = imagesArray.every((file) => {
        if (file.size > fileSizeLimit) {
          applyError({
            isError: true,
            message: `A file must not be larger than ${fileSizeLimit} bytes: ${file.size}`,
          });
          changeImages([]);
          return false;
        }
        return true;
      });

      if (!sizeLimitCheck) return;

      const fileTypeCheck = imagesArray.every((file) => {
        if (!(file instanceof File)) {
          applyError({
            isError: true,
            message: 'Given value does not hold a file type',
          });
          changeImages([]);
          return false;
        }
        return true;
      });

      if (!fileTypeCheck) return;

      changeImages(imagesArray);
      applyError({ isError: false, message: '' });
    } else {
      let file: File | null = null;

      const files = (event.target as HTMLInputElement).files;

      if (files && files.length !== 0) {
        file = files[0];
      }

      if (!file) {
        applyError({
          isError: true,
          message: 'Product main image is required',
        });
        changeImage('');
        return;
      }

      if (file.size > fileSizeLimit) {
        applyError({
          isError: true,
          message: `A file must not be larger than ${fileSizeLimit} bytes: ${file.size}`,
        });
        changeImage('');
        return;
      }

      if (!(file instanceof File)) {
        applyError({
          isError: true,
          message: 'Given value does not hold a file type',
        });
        changeImage('');
        return;
      }

      changeImage(file);
      applyError({ isError: false, message: '' });
    }
  };

  return (
    <>
      <ImageUploadContainer onClick={handleImageClick}>
        {!image && images.length === 0 && (
          <MdCloudUpload color="#1475cf" size={70} width={75} height={75} />
        )}
        {image && <MainImage src={URL.createObjectURL(image)} alt="" />}
        {images && (
          <ImagesPreviewContainer>
            <ImagesPreviewFlexWrapper>
              {images.map((image, idx) => (
                <ImagesContainer key={idx}>
                  <Image src={URL.createObjectURL(image)} alt="" />
                </ImagesContainer>
              ))}
            </ImagesPreviewFlexWrapper>
          </ImagesPreviewContainer>
        )}

        <input
          type="file"
          ref={inputRef}
          name={name}
          onChange={handleImageChange}
          style={{ display: 'none' }}
          multiple={multiple}
          {...props}
        />
      </ImageUploadContainer>
      {error && <p>{error.message}</p>}
    </>
  );
};
