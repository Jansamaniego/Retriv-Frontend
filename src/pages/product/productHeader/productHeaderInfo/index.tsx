import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAddProductToCartMutation } from 'redux/services/cartApi/cartApi';
import {
  useDeleteProductMutation,
  useUpdateProductDetailsMutation,
} from 'redux/services/productApi/productApi';
import { CheckIcon, StarGradientIcon } from 'assets/icons';
import {
  Button,
  QuantityTogglerInput,
  Socials,
  StyledInput,
  StyledModal,
  TransparentPopup,
} from 'components/common';
import { EditIconButton } from 'components/common/editIconButton';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

interface IProductHeaderInfoProps {
  productId: string;
  name: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  quantitySold: number;
  isOutOfStock: boolean;
  quantityInStock: number;
  description: string;
  price: number;
  shopId: string;
  isOwner: boolean;
}

interface FormValues {
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
}

const ProductInfo = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

const ProductDataValueFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const ProductInfoBigText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

const ProductInfoText = styled.h4`
  color: ${(props) => props.theme.neutral.text};
`;

const ProductInfoSubText = styled.h5`
  color: ${(props) => props.theme.neutral.text};
`;

const ProductInfoMiniText = styled.h6`
  color: ${(props) => props.theme.neutral.text};
`;

const ProductInfoStatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ProductInfoStatsAvgRating = styled.div`
  display: flex;
  gap: 1.6rem;
  border-right: 1px solid ${(props) => props.theme.neutral[100]};
  justify-content: center;
  align-self: center;
`;

const RatingsAverage = styled.h5`
  color: ${(props) => props.theme.primary.main};
  text-decoration: underline;
`;

const ProductInfoStatsAvgRatingStars = styled.div`
  display: flex;
  align-items: center;
`;

const ProductInfoStatsRatingQuantityContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.neutral[100]};
  display: flex;
  justify-content: center;
`;

const ProductInfoStatsProductsSoldContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DescriptionContainer = styled.div`
  margin-top: 2.4rem;
`;

const QuantityControllerContainer = styled.section`
  display: flex;
  gap: 1.6rem;
  margin-top: 2.4rem;
`;

const AddToCartButton = styled(Button)`
  margin-bottom: 2.4rem;
`;

const ProductHeaderInfo: React.FC<IProductHeaderInfoProps> = ({
  productId,
  name,
  ratingsAverage,
  ratingsQuantity,
  quantitySold,
  isOutOfStock,
  quantityInStock,
  description,
  price,
  shopId,
  isOwner,
}) => {
  const navigate = useNavigate();

  const currentUser = useSelector((state: RootState) => state.userState.user);
  const [quantityToPurchase, setQuantityToPurchase] = useState(1);
  const [isTransparentPopupOpen, setIsTransparentPopupOpen] = useState(false);
  const [avgRating] = useState(ratingsAverage * 10);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [isEditNameMode, setIsEditNameMode] = useState(false);
  const [isEditDescriptionMode, setIsEditDescriptionMode] = useState(false);
  const [isEditPriceMode, setIsEditPriceMode] = useState(false);
  const [isEditQuantityInStockMode, setIsEditQuantityInStockMode] =
    useState(false);

  const [
    addProductToCart,
    { isLoading: addProductIsLoading, isSuccess: addProductIsSuccess },
  ] = useAddProductToCartMutation();

  const [deleteProduct, { isLoading: deleteProductIsLoading }] =
    useDeleteProductMutation();

  const [updateProductDetails, { isLoading: isUpdateProductLoading }] =
    useUpdateProductDetailsMutation();

  const updateProductDetailsSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.any(),
    quantityInStock: z.any(),
  });

  const methods = useForm<FormValues>({
    defaultValues: {
      name,
      description,
      price,
      quantityInStock,
    },
    resolver: zodResolver(updateProductDetailsSchema),
  });

  const { handleSubmit } = methods;

  const openEditModal = () => {
    setisEditModalOpen(true);
  };

  const closeEditModal = () => {
    setisEditModalOpen(false);

    if (isEditNameMode) setIsEditNameMode(false);
    if (isEditDescriptionMode) setIsEditDescriptionMode(false);
    if (isEditPriceMode) setIsEditPriceMode(false);
    if (isEditQuantityInStockMode) setIsEditQuantityInStockMode(false);
  };

  const enableEditNameMode = () => {
    setIsEditNameMode(true);
    openEditModal();
  };

  const disableEditNameMode = () => {
    setIsEditNameMode(false);
    closeEditModal();
  };

  const enableEditDescriptionMode = () => {
    setIsEditDescriptionMode(true);
    openEditModal();
  };

  const disableEditDescriptionMode = () => {
    setIsEditDescriptionMode(false);
    closeEditModal();
  };

  const enableEditPriceMode = () => {
    setIsEditPriceMode(true);
    openEditModal();
  };

  const disableEditPriceMode = () => {
    setIsEditPriceMode(false);
    closeEditModal();
  };

  const enableEditQuantityInStockMode = () => {
    setIsEditQuantityInStockMode(true);
    openEditModal();
  };

  const disableEditQuantityInStockMode = () => {
    setIsEditQuantityInStockMode(false);
    closeEditModal();
  };

  const decrementQuantityToPurchase = () => {
    if (quantityToPurchase <= 1) return;
    setQuantityToPurchase((value) => {
      return Number(value) - 1;
    });
  };

  const incrementQuantityToPurchase = () => {
    setQuantityToPurchase((value) => Number(value) + 1);
  };

  const changeQuantityToPurchase = (event: ChangeEvent) => {
    setQuantityToPurchase(Number((event.target as HTMLInputElement).value));
  };

  const addToCartOnClickHandler = async () => {
    await addProductToCart({ quantity: quantityToPurchase, productId });
  };

  useEffect(() => {
    const toggleTransparentPopup = () => {
      setIsTransparentPopupOpen(true);
      setTimeout(() => {
        setIsTransparentPopupOpen(false);
      }, 3000);
    };

    if (!addProductIsLoading && addProductIsSuccess) {
      toggleTransparentPopup();
    }
  }, [addProductIsLoading, addProductIsSuccess]);

  const removeProductOnClickHandler = async () => {
    await deleteProduct({ shopId, productId });
    navigate('/my-shop');
  };

  const openDeleteProductModal = () => {
    setIsDeleteProductModalOpen(true);
  };

  const closeDeleteProductModal = () => {
    setIsDeleteProductModalOpen(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await updateProductDetails({ productId, shopId, ...data });

    if (isEditNameMode) return disableEditNameMode();
    if (isEditDescriptionMode) return disableEditDescriptionMode();
    if (isEditPriceMode) return disableEditPriceMode();
    if (isEditQuantityInStockMode) return disableEditQuantityInStockMode();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProductInfo>
            <ProductDataValueFlexWrapper>
              <ProductInfoBigText>{name}</ProductInfoBigText>
              {isOwner && (
                <EditIconButton
                  buttonProps={{
                    onClick: enableEditNameMode,
                    disabled: isEditModalOpen,
                  }}
                  svgProps={{ width: '2rem' }}
                />
              )}
            </ProductDataValueFlexWrapper>

            <ProductInfoStatsContainer>
              <ProductInfoStatsAvgRating>
                <RatingsAverage>{ratingsAverage}</RatingsAverage>
                <ProductInfoStatsAvgRatingStars>
                  {[...Array(5)].map((star, idx) => (
                    <StarGradientIcon
                      key={idx}
                      width="2rem"
                      gradient={
                        avgRating - idx * 10 >= 10 ? 10 : avgRating - idx * 10
                      }
                    />
                  ))}
                </ProductInfoStatsAvgRatingStars>
              </ProductInfoStatsAvgRating>
              <ProductInfoStatsRatingQuantityContainer>
                <ProductInfoSubText>
                  {ratingsQuantity} Ratings
                </ProductInfoSubText>
              </ProductInfoStatsRatingQuantityContainer>
              <ProductInfoStatsProductsSoldContainer>
                <ProductInfoSubText>{quantitySold} Sold</ProductInfoSubText>
              </ProductInfoStatsProductsSoldContainer>
            </ProductInfoStatsContainer>
            <DescriptionContainer>
              <>
                <ProductDataValueFlexWrapper>
                  <ProductInfoMiniText>{description}</ProductInfoMiniText>
                  {isOwner && (
                    <EditIconButton
                      buttonProps={{
                        onClick: enableEditDescriptionMode,
                        disabled: isEditModalOpen,
                      }}
                      svgProps={{ width: '2rem' }}
                    />
                  )}
                </ProductDataValueFlexWrapper>
              </>
            </DescriptionContainer>
            <ProductDataValueFlexWrapper>
              <ProductInfoText> &#8369;{price}</ProductInfoText>
              {isOwner && (
                <EditIconButton
                  buttonProps={{
                    onClick: enableEditPriceMode,
                    disabled: isEditModalOpen,
                  }}
                  svgProps={{ width: '2rem' }}
                />
              )}
            </ProductDataValueFlexWrapper>
            {isOwner && (
              <div>
                <Button
                  large
                  onClick={openDeleteProductModal}
                  disabled={deleteProductIsLoading}
                >
                  Delete Product
                </Button>
              </div>
            )}
            <>
              <QuantityControllerContainer>
                <div>
                  <ProductInfoMiniText>Quantity</ProductInfoMiniText>
                </div>
                {currentUser && (
                  <QuantityTogglerInput
                    decrementQuantityToggle={decrementQuantityToPurchase}
                    incrementQuantityToggle={incrementQuantityToPurchase}
                    onChangeHandler={changeQuantityToPurchase}
                    QuantityInputValue={quantityToPurchase}
                  />
                )}
                <div>
                  <div>
                    <ProductDataValueFlexWrapper>
                      <ProductInfoMiniText>
                        {isOutOfStock
                          ? 'Out of stock'
                          : `${quantityInStock} units available`}
                      </ProductInfoMiniText>
                      {isOwner && (
                        <EditIconButton
                          buttonProps={{
                            onClick: enableEditQuantityInStockMode,
                            disabled: isEditModalOpen,
                          }}
                          svgProps={{ width: '2rem' }}
                        />
                      )}
                    </ProductDataValueFlexWrapper>
                  </div>
                </div>
              </QuantityControllerContainer>
              {!isOwner && currentUser && (
                <div>
                  <AddToCartButton
                    onClick={addToCartOnClickHandler}
                    disabled={addProductIsLoading}
                  >
                    Add To Cart
                  </AddToCartButton>
                </div>
              )}
            </>
            <Socials />
            {isTransparentPopupOpen && (
              <TransparentPopup>
                <CheckIcon width="3rem" />
                <ProductInfoBigText>
                  Item has been added to your cart!
                </ProductInfoBigText>
              </TransparentPopup>
            )}
          </ProductInfo>
          {isEditModalOpen && (
            <StyledModal
              isModalOpen={isEditModalOpen}
              closeModal={closeEditModal}
              isLoading={isUpdateProductLoading}
            >
              {isEditNameMode && (
                <>
                  <ProductInfoText>Name</ProductInfoText>
                  <StyledInput
                    placeholder="Name"
                    name="name"
                    marginBottom={0}
                  />
                </>
              )}
              {isEditDescriptionMode && (
                <>
                  <ProductInfoText>Description</ProductInfoText>
                  <StyledInput
                    placeholder="Description"
                    name="description"
                    marginBottom={0}
                  />
                </>
              )}
              {isEditPriceMode && (
                <>
                  <ProductInfoText>Price</ProductInfoText>
                  <StyledInput
                    placeholder="Price"
                    name="price"
                    marginBottom={0}
                  />
                </>
              )}
              {isEditQuantityInStockMode && (
                <>
                  <ProductInfoText>QuantityInStock</ProductInfoText>
                  <StyledInput
                    placeholder="Quantity in stock"
                    type="number"
                    name="quantityInStock"
                    marginBottom={0}
                  />
                </>
              )}
            </StyledModal>
          )}
        </form>
      </FormProvider>
      {isDeleteProductModalOpen && (
        <StyledModal
          isModalOpen={isDeleteProductModalOpen}
          closeModal={closeDeleteProductModal}
          isLoading={deleteProductIsLoading}
          onClick={removeProductOnClickHandler}
        >
          Are you sure you want to remove this product?
        </StyledModal>
      )}
    </>
  );
};

export default ProductHeaderInfo;
