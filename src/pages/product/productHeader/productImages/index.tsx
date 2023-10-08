import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { EditIcon, XMarkIcon } from '../../../../assets/icons';
import { IProduct } from 'src/types';

interface ISmallImageProps {
  onMouseEnter: (event: MouseEvent) => void;
}

interface ISmallImageContainerProps {
  pointer?: boolean;
  onClick?: () => void;
  outline?: string;
}

interface IDisplayImageContainer {
  onClick: (event: MouseEvent) => void;
}

interface IProductImagesProps {
  product: IProduct;
  isOwner: boolean;
  setIsDisplayImageModalOpen: (boolean: boolean) => void;
  setIsMainImageEditModalOpen: (boolean: boolean) => void;
  setIsAddProductImagesModalOpen: (boolean: boolean) => void;
  setIsDeleteProductImageModalOpen: (boolean: boolean) => void;
}

const ImagesWrapper = styled.section``;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ImagesFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const DisplayImageContainer = styled.div<IDisplayImageContainer>`
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.primary.main};
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 45rem;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const DisplayImage = styled.img`
  object-fit: cover;
  min-height: 45rem;
`;

const EditIconButton = styled.button`
  position: absolute;
  background-color: ${(props) => props.theme.neutral[700]};
  right: 0.8rem;
  bottom: 0.4rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  color: ${(props) =>
    props.disabled ? props.theme.neutral.light : props.theme.neutral.text};
  border: none;
  padding: 0.2rem;
  font: inherit;
  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};
  outline: inherit;
`;

const XMarkIconButton = styled.button`
  position: absolute;
  background-color: ${(props) => props.theme.neutral[700]};
  right: 0.8rem;
  top: 0.4rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  color: ${(props) =>
    props.disabled ? props.theme.neutral.light : props.theme.neutral.text};
  border: none;
  padding: 0.2rem;
  font: inherit;
  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};
  outline: inherit;
`;

const ImagesPickerContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const SmallImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 10rem;
  max-width: 15rem;
  width: 100%;

  @media (max-width: 900px) {
    max-width: 30rem;
  }
`;

const SmallImageContainer = styled.div<ISmallImageContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  outline: ${(props) => {
    switch (props.outline) {
      case 'selectedImage':
        return `1px solid ${props.theme.primary.main}`;
      case 'addImage':
        return `1px solid ${props.theme.neutral[200]}`;
      default:
        return 'none';
    }
  }};
  border-radius: 0.5rem;
  width: fit-content;
  cursor: ${(props) => props.pointer && 'pointer'};
`;

const SmallImage = styled.img<ISmallImageProps>`
  width: 8rem;
  height: 6rem;
  object-fit: cover;
`;

const AddImageIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 6rem;
  font-size: 6rem;
`;

const ProductImages: React.FC<IProductImagesProps> = ({
  product,
  isOwner,
  setIsDisplayImageModalOpen,
  setIsMainImageEditModalOpen,
  setIsAddProductImagesModalOpen,
  setIsDeleteProductImageModalOpen,
}) => {
  const displayImageRef = useRef<HTMLImageElement | null>(null);
  const [displayImage, setDisplayImage] = useState<string>('');

  const { mainImage, images } = product;

  useEffect(() => {
    setDisplayImage(mainImage);
  }, [mainImage, images]);

  const productImages = [mainImage, ...images];

  const onMouseEnter = (event: MouseEvent) => {
    setDisplayImage((event.target as HTMLImageElement).currentSrc);
  };

  const showDisplayImageModal = (event: MouseEvent) => {
    if (event.target !== displayImageRef.current) {
      return;
    } else {
      setIsDisplayImageModalOpen(true);
    }
  };

  const showMainImageEditModal = () => {
    setIsMainImageEditModalOpen(true);
  };

  const showAddProductImagesModal = () => {
    setIsAddProductImagesModalOpen(true);
  };

  const showDeleteProductImageModal = () => {
    setIsDeleteProductImageModalOpen(true);
  };

  console.log(productImages.length <= 9);

  return (
    <ImagesWrapper>
      <ImagesContainer>
        <ImagesFlex>
          <DisplayImageContainer onClick={showDisplayImageModal}>
            <DisplayImage src={displayImage} ref={displayImageRef} />
            {displayImage === mainImage && (
              <>
                {isOwner && (
                  <EditIconButton onClick={showMainImageEditModal}>
                    <EditIcon width="4rem" />
                  </EditIconButton>
                )}
              </>
            )}
            {displayImage !== mainImage && (
              <XMarkIconButton onClick={showDeleteProductImageModal}>
                <XMarkIcon width="4rem" />
              </XMarkIconButton>
            )}
          </DisplayImageContainer>
          <ImagesPickerContainer>
            {productImages.map((image, idx) => (
              <SmallImageContainer
                key={idx}
                outline={image === displayImage ? 'selectedImage' : ''}
              >
                <SmallImage
                  src={image}
                  alt="product image"
                  onMouseEnter={onMouseEnter}
                />
              </SmallImageContainer>
            ))}
            {isOwner && (
              <>
                {productImages.length <= 4 && (
                  <SmallImageContainer
                    pointer={true}
                    onClick={showAddProductImagesModal}
                    outline={'addImage'}
                  >
                    <AddImageIcon>+</AddImageIcon>
                  </SmallImageContainer>
                )}
              </>
            )}
          </ImagesPickerContainer>
        </ImagesFlex>
      </ImagesContainer>
    </ImagesWrapper>
  );
};

export default ProductImages;
