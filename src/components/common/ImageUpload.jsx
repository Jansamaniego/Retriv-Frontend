import React, { useEffect, useRef, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import styled from 'styled-components';

const ImageUploadContainer = styled.div`
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

const ImageUpload = ({
  name,
  multiple,
  image = null,
  setImage,
  images = [],
  setImages,
  error,
  setError,
  fileSizeLimit,
  ...props
}) => {
  const inputRef = useRef();
  // const [isError, setIsError] = useState(false);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = async (event) => {
    if (multiple) {
      const files = event.target.files;

      const imagesArray = Array.from(files).map((file) => file);

      if (imagesArray.length === 0) {
        setError({
          isError: true,
          message: 'Product sub image/s is/are required',
        });
        setImages([]);
        return;
      }

      const sizeLimitCheck = imagesArray.every((file) => {
        if (file.size > fileSizeLimit) {
          setError({
            isError: true,
            message: `A file must not be larger than ${fileSizeLimit} bytes: ${file.size}`,
          });
          setImages([]);
          return false;
        }
        return true;
      });

      if (!sizeLimitCheck) return;

      const fileTypeCheck = imagesArray.every((file) => {
        if (!(file instanceof File)) {
          setError({
            isError: true,
            message: 'Given value does not hold a file type',
          });
          setImages([]);
          return false;
        }
        return true;
      });

      if (!fileTypeCheck) return;

      setImages(imagesArray);
      setError({ isError: false, message: '' });
    } else {
      const file = event.target.files[0];

      if (!file) {
        setError({ isError: true, message: 'Product main image is required' });
        setImage('');
        return;
      }

      if (file.size > fileSizeLimit) {
        setError({
          isError: true,
          message: `A file must not be larger than ${fileSizeLimit} bytes: ${file.size}`,
        });
        setImage('');
        return;
      }

      if (!(file instanceof File)) {
        setError({
          isError: true,
          message: 'Given value does not hold a file type',
        });
        setImage('');
        return;
      }

      setImage(file);
      setError({ isError: false, message: '' });
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

export default ImageUpload;
