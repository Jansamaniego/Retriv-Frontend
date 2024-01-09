import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IProduct } from 'types';
import { IProductRatings } from 'redux/services/ratings/productRatingsApi/productRatingsApi.types';
import { useDeleteProductImageMutation } from 'redux/services/productApi/productApi';
import {
  Card,
  CardWithFlexWrapper,
  ContentFlexWrapper,
  StyledModal,
} from 'components/common';
import DisplayImageModal from 'pages/product/productHeader/displayImageModal';
import ProductHeaderInfo from 'pages/product/productHeader/productHeaderInfo';
import UpdateProductMainImageModal from 'pages/product/productHeader/updateProductMainImageModal';
import AddProductImagesModal from 'pages/product/productHeader/addProductImagesModal';
import ProductImages from 'pages/product/productHeader/productImages';

interface IProductHeaderProps {
  product: IProduct;
  productRatings:
    | IProductRatings
    | { ratingsAverage: number; ratingsQuantity: number };
  isOwner: boolean;
  shopId: string;
}

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

const DeleteProductImageModalText = styled.h4`
  color: ${(props) => props.theme.neutral.text};
`;

const ProductHeader: React.FC<IProductHeaderProps> = ({
  product,
  productRatings,
  isOwner,
  shopId,
}) => {
  const [displayImage, setDisplayImage] = useState('');
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

  const closeDisplayImageModal = () => {
    setIsDisplayImageModalOpen(false);
  };

  const closeMainImageEditModal = () => {
    setIsMainImageEditModalOpen(false);
  };

  const closeAddProductImagesModal = () => {
    setIsAddProductImagesModalOpen(false);
  };

  const closeDeleteProductImageModal = () => {
    setIsDeleteProductImageModalOpen(false);
  };

  const deleteProductImageOnClickHandler = async () => {
    await deleteProductImage({ shopId, productId: id, image: displayImage });
  };

  return (
    <>
      <CardWithFlexWrapper>
        <ContentFlexWrapper>
          <ProductImages
            product={product}
            isOwner={isOwner}
            setIsDisplayImageModalOpen={setIsDisplayImageModalOpen}
            setIsMainImageEditModalOpen={setIsMainImageEditModalOpen}
            setIsAddProductImagesModalOpen={setIsAddProductImagesModalOpen}
            setIsDeleteProductImageModalOpen={setIsDeleteProductImageModalOpen}
          />
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
        </ContentFlexWrapper>
      </CardWithFlexWrapper>
      {isDisplayImageModalOpen && (
        <DisplayImageModal
          isModalOpen={isDisplayImageModalOpen}
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
          isModalOpen={isMainImageEditModalOpen}
          closeModal={closeMainImageEditModal}
          shopId={shopId}
          productId={id}
        />
      )}
      {isAddProductImagesModalOpen && (
        <AddProductImagesModal
          isModalOpen={isAddProductImagesModalOpen}
          closeModal={closeAddProductImagesModal}
          shopId={shopId}
          productId={id}
        />
      )}
      {isDeleteProductImageModalOpen && (
        <StyledModal
          isModalOpen={isDeleteProductImageModalOpen}
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
            <DeleteProductImageModalText>
              Are you sure you want to remove this product image?
            </DeleteProductImageModalText>
          </DeleteModalFlexWrapper>
        </StyledModal>
      )}
    </>
  );
};

export default ProductHeader;
