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

const ProductDataInputFlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FlexWrapper = styled.div`
  display: flex;
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
  gap: 2.4rem;
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
            <>
              <ProductDataValueFlexWrapper>
                <h3>{name}</h3>
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
            </>
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
                <h5>{ratingsQuantity} Ratings</h5>
              </ProductInfoStatsRatingQuantityContainer>
              <ProductInfoStatsProductsSoldContainer>
                <h5>{quantitySold} Sold</h5>
              </ProductInfoStatsProductsSoldContainer>
            </ProductInfoStatsContainer>
            <DescriptionContainer>
              <>
                <ProductDataValueFlexWrapper>
                  <h6>{description}</h6>
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
              <h4> &#8369;{price}</h4>
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
                  <h6>Quantity</h6>
                </div>
                <QuantityTogglerInput
                  decrementQuantityToggle={decrementQuantityToPurchase}
                  incrementQuantityToggle={incrementQuantityToPurchase}
                  onChangeHandler={changeQuantityToPurchase}
                  QuantityInputValue={quantityToPurchase}
                />
                <div>
                  <div>
                    <ProductDataValueFlexWrapper>
                      <h6>
                        {isOutOfStock
                          ? 'Out of stock'
                          : `${quantityInStock} units available`}
                      </h6>
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
              {!isOwner && (
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
                <h3>Item has been added to your cart!</h3>
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
                  <h4>Name</h4>
                  <StyledInput
                    placeholder="Name"
                    name="name"
                    marginBottom={0}
                  />
                </>
              )}
              {isEditDescriptionMode && (
                <>
                  <h4>Description</h4>
                  <StyledInput
                    placeholder="Description"
                    name="description"
                    marginBottom={0}
                  />
                </>
              )}
              {isEditPriceMode && (
                <>
                  <h4>Price</h4>
                  <StyledInput
                    placeholder="Price"
                    name="price"
                    marginBottom={0}
                  />
                </>
              )}
              {isEditQuantityInStockMode && (
                <>
                  <h4>QuantityInStock</h4>
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
