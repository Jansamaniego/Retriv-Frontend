import React, { useEffect, useRef, useState } from 'react';

import { Card, StyledModal } from '../common';
import styled from 'styled-components';
import DisplayImageModal from './DisplayImageModal';

import ProductHeaderInfo from './ProductHeaderInfo';
import { EditIcon, XMarkIcon } from '../../assets/icons';
import UpdateProductMainImageModal from './UpdateProductMainImageModal';
import AddProductImagesModal from './AddProductImagesModal';
import { useDeleteProductImageMutation } from '../../redux/services/productApi';

const ProductHeaderCard = styled(Card)``;

const ProductHeaderContentContainer = styled.div`
  display: flex;
`;

const ImagesWrapper = styled.section`
  width: 40%;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ImagesFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const CarouselContainer = styled.div`
  margin: '20px 0 20px 0';
`;

const DisplayImageContainer = styled.div`
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
`;

const DisplayImage = styled.img`
  object-fit: cover;
  height: 45rem;
`;

const ImageFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const DeleteModalFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
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

const SmallImageContainer = styled.div`
  display: flex;
  justify-content: center;
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
  width: 8rem;
  cursor: ${(props) => props.pointer && 'pointer'};
`;

const SmallImage = styled.img`
  object-fit: cover;
`;

const AddImageIcon = styled.div`
  font-size: 100px;
`;

const ProductSubImage = () => {
  return;
};

const ProductHeader = ({ product, productRatings, isOwner, shopId }) => {
  const displayImageRef = useRef();
  const [displayImage, setDisplayImage] = useState();
  const [deleteProductImage, { isLoading: deleteProductImageIsLoading }] =
    useDeleteProductImageMutation();
  const [isDisplayImageModalOpen, setIsDisplayImageModalOpen] = useState(false);
  const [isMainImageEditModalOpen, setIsMainImageEditModalOpen] =
    useState(false);
  const [isAddProductImagesModalOpen, setIsAddProductImagesModalOpen] =
    useState(false);
  const [isDeleteProductImageModalOpen, setIsDeleteProductImageModalOpen] =
    useState(false);

  const {
    id,
    mainImage,
    images,
    name,
    quantitySold,
    isOutOfStock,
    quantityInStock,
    description,
    price,
  } = product;

  const { ratingsAverage, ratingsQuantity } = productRatings;

  useEffect(() => {
    setDisplayImage(mainImage);
  }, [mainImage, images]);

  const productImages = [mainImage, ...images];

  const onMouseEnter = (e) => {
    setDisplayImage(e.target.currentSrc);
  };

  const showDisplayImageModal = (event) => {
    if (event.target !== displayImageRef.current) {
      return;
    } else {
      setIsDisplayImageModalOpen(true);
    }
  };

  const closeDisplayImageModal = () => {
    setIsDisplayImageModalOpen(false);
  };

  const showMainImageEditModal = () => {
    setIsMainImageEditModalOpen(true);
  };

  const closeMainImageEditModal = () => {
    setIsMainImageEditModalOpen(false);
  };

  const showAddProductImagesModal = () => {
    setIsAddProductImagesModalOpen(true);
  };

  const closeAddProductImagesModal = () => {
    setIsAddProductImagesModalOpen(false);
  };

  const showDeleteProductImageModal = () => {
    setIsDeleteProductImageModalOpen(true);
  };

  const closeDeleteProductImageModal = () => {
    setIsDeleteProductImageModalOpen(false);
  };

  const deleteProductImageOnClickHandler = async () => {
    await deleteProductImage({ shopId, productId: id, image: displayImage });
  };

  console.log(productImages.length <= 9);

  return (
    <ProductHeaderCard>
      <ProductHeaderContentContainer>
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
                    outline={image === displayImage ? 'selectedImage' : false}
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
        <ProductHeaderInfo
          productId={id}
          name={name}
          quantitySold={quantitySold}
          isOutOfStock={isOutOfStock}
          quantityInStock={quantityInStock}
          ratingsAverage={ratingsAverage}
          ratingsQuantity={ratingsQuantity}
          description={description}
          price={price}
          isOwner={isOwner}
          shopId={shopId}
        />
      </ProductHeaderContentContainer>
      {isDisplayImageModalOpen && (
        <DisplayImageModal
          showModal={showDisplayImageModal}
          closeModal={closeDisplayImageModal}
          displayImage={displayImage}
          imageSlide={productImages.findIndex(
            (productImage) => productImage === displayImage
          )}
          name={name}
          productImages={productImages}
        />
      )}
      {isMainImageEditModalOpen && (
        <UpdateProductMainImageModal
          showModal={showMainImageEditModal}
          closeModal={closeMainImageEditModal}
          shopId={shopId}
          productId={id}
        />
      )}
      {isAddProductImagesModalOpen && (
        <AddProductImagesModal
          showModal={showAddProductImagesModal}
          closeModal={closeAddProductImagesModal}
          shopId={shopId}
          productId={id}
        />
      )}
      {isDeleteProductImageModalOpen && (
        <StyledModal
          showModal={showDeleteProductImageModal}
          closeModal={closeDeleteProductImageModal}
          onClick={deleteProductImageOnClickHandler}
          isLoading={deleteProductImageIsLoading}
        >
          <DeleteModalFlexWrapper>
            <ImageFlexWrapper>
              <DisplayImageContainer>
                <DisplayImage src={displayImage} alt="delete this" />
              </DisplayImageContainer>
            </ImageFlexWrapper>
            <h4>Are you sure you want to remove this product image?</h4>
          </DeleteModalFlexWrapper>
        </StyledModal>
      )}
    </ProductHeaderCard>
  );
};

export default ProductHeader;
