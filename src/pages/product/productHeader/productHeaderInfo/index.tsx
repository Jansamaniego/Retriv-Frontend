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
import { CheckIcon, EditIcon, StarGradientIcon } from 'assets/icons';
import {
  Button,
  QuantityTogglerInput,
  Socials,
  StyledInput,
  StyledModal,
  TransparentPopup,
} from 'components/common';

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

const EditIconButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  color: ${(props) =>
    props.disabled ? props.theme.neutral.light : props.theme.neutral.text};
  border: none;
  padding: 0;
  font: inherit;
  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};
  outline: inherit;
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
  const [isEditMode, setIsEditMode] = useState(false);
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

  const [updateProductDetails] = useUpdateProductDetailsMutation();

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

  const enableEditNameMode = () => {
    setIsEditNameMode(true);
    setIsEditMode(true);
  };

  const disableEditNameMode = () => {
    setIsEditNameMode(false);
    setIsEditMode(false);
  };

  const enableEditDescriptionMode = () => {
    setIsEditDescriptionMode(true);
    setIsEditMode(true);
  };

  const disableEditDescriptionMode = () => {
    setIsEditDescriptionMode(false);
    setIsEditMode(false);
  };

  const enableEditPriceMode = () => {
    setIsEditPriceMode(true);
    setIsEditMode(true);
  };

  const disableEditPriceMode = () => {
    setIsEditPriceMode(false);
    setIsEditMode(false);
  };

  const enableEditQuantityInStockMode = () => {
    setIsEditQuantityInStockMode(true);
    setIsEditMode(true);
  };

  const disableEditQuantityInStockMode = () => {
    setIsEditQuantityInStockMode(false);
    setIsEditMode(false);
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
            {isEditNameMode ? (
              <>
                <ProductDataInputFlexWrapper>
                  <StyledInput
                    placeholder="Name"
                    name="name"
                    marginBottom={0}
                  />
                  <FlexWrapper>
                    <Button onClick={disableEditNameMode}>Cancel</Button>
                    <Button type="submit">Update</Button>
                  </FlexWrapper>
                </ProductDataInputFlexWrapper>
              </>
            ) : (
              <>
                <ProductDataValueFlexWrapper>
                  <h3>{name}</h3>
                  {isOwner && (
                    <EditIconButton
                      onClick={enableEditNameMode}
                      disabled={isEditMode}
                    >
                      <EditIcon width="2rem" />
                    </EditIconButton>
                  )}
                </ProductDataValueFlexWrapper>
              </>
            )}
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
              {isEditDescriptionMode ? (
                <>
                  <ProductDataInputFlexWrapper>
                    <StyledInput
                      placeholder="Quantity in stock"
                      name="description"
                      marginBottom={0}
                    />
                    <FlexWrapper>
                      <Button onClick={disableEditDescriptionMode}>
                        Cancel
                      </Button>
                      <Button type="submit">Update</Button>
                    </FlexWrapper>
                  </ProductDataInputFlexWrapper>
                </>
              ) : (
                <>
                  <ProductDataValueFlexWrapper>
                    <h6>{description}</h6>
                    {isOwner && (
                      <EditIconButton
                        onClick={enableEditDescriptionMode}
                        disabled={isEditMode}
                      >
                        <EditIcon width="2rem" />
                      </EditIconButton>
                    )}
                  </ProductDataValueFlexWrapper>
                </>
              )}
            </DescriptionContainer>
            {isEditPriceMode ? (
              <ProductDataInputFlexWrapper>
                <StyledInput
                  placeholder="Price"
                  name="price"
                  marginBottom={0}
                />
                <FlexWrapper>
                  <Button onClick={disableEditPriceMode}>Cancel</Button>
                  <Button type="submit">Update</Button>
                </FlexWrapper>
              </ProductDataInputFlexWrapper>
            ) : (
              <ProductDataValueFlexWrapper>
                <h4> &#8369;{price}</h4>
                {isOwner && (
                  <EditIconButton
                    onClick={enableEditPriceMode}
                    disabled={isEditMode}
                  >
                    <EditIcon width="2rem" />
                  </EditIconButton>
                )}
              </ProductDataValueFlexWrapper>
            )}
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
                    {isEditQuantityInStockMode ? (
                      <ProductDataInputFlexWrapper>
                        <StyledInput
                          placeholder="Quantity in stock"
                          name="quantityInStock"
                          marginBottom={0}
                        />
                        <FlexWrapper>
                          <Button onClick={disableEditQuantityInStockMode}>
                            Cancel
                          </Button>
                          <Button type="submit">Update</Button>
                        </FlexWrapper>
                      </ProductDataInputFlexWrapper>
                    ) : (
                      <ProductDataValueFlexWrapper>
                        <h6>
                          {isOutOfStock
                            ? 'Out of stock'
                            : `${quantityInStock} units available`}
                        </h6>
                        {isOwner && (
                          <EditIconButton
                            onClick={enableEditQuantityInStockMode}
                            disabled={isEditMode}
                          >
                            <EditIcon width="2rem" />
                          </EditIconButton>
                        )}
                      </ProductDataValueFlexWrapper>
                    )}
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
