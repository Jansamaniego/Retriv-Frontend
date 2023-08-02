import React, { useState } from 'react';
import {
  CheckIcon,
  EditIcon,
  MinusIcon,
  PlusIcon,
  StarGradientIcon,
} from '../../assets/icons';
import styled from 'styled-components';
import {
  Button,
  Form,
  QuantityTogglerInput,
  Socials,
  StyledInput,
  TransparentPopup,
} from '../common';
import { useAddProductToCartMutation } from '../../redux/services/cartApi';
import {
  useDeleteProductMutation,
  useUpdateProductDetailsMutation,
  useUpdateProductImagesMutation,
  useUpdateProductMainImageMutation,
} from '../../redux/services/productApi';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ProductInfo = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 50%;
`;

const ProductDataValueFlexWrapper = styled.div`
  display: flex;
`;

const ProductDataInputFlexWrapper = styled.div`
  flex-direction: column;
`;

const Value = styled.h6`
  padding: 0.4rem 0.8rem;
`;

const ProductInfoName = styled.h3``;

const ProductInfoStatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const ProductInfoStatsAvgRating = styled.div`
  display: flex;
  gap: 1.6rem;
  border-right: 1px solid ${(props) => props.theme.neutral[100]};
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

const ProductInfoStatsRatingQuantity = styled.h5``;

const ProductInfoStatsProductsSoldContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProductInfoStatsProductsSold = styled.h5``;

const DescriptionContainer = styled.div`
  margin-top: 2.4rem;
`;

const Description = styled.h6``;

const PriceContainer = styled.div``;

const Price = styled.h4``;

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

const QuantityContainer = styled.div``;

const Quantity = styled.h6``;

const QuantityControlContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityControl = styled.input.attrs({
  type: 'number',
})`
  text-align: center;
  min-height: 100%;
  font-size: 1.6rem;
  width: 4.8rem;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const DecrementQuantityButton = styled.button`
  cursor: pointer;
`;

const IncrementQuantityButton = styled.button`
  cursor: pointer;
`;

const QuantityInStockContainer = styled.div``;

const QuantityInStock = styled.h6``;

const AddToCartButtonContainer = styled.div``;

const AddToCartButton = styled(Button)`
  margin-bottom: 2.4rem;
`;

const RemoveProductButton = styled(Button)``;

const ProductHeaderInfo = ({
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

  const [
    addProductToCart,
    { isLoading: addProductIsLoading, isSuccess: addProductIsSuccess },
  ] = useAddProductToCartMutation();

  const [
    deleteProduct,
    { isLoading: deleteProductIsLoading, isSuccess: deleteProductIsSuccess },
  ] = useDeleteProductMutation();

  const [updateProductDetails, { isLoading: updateProductDetailsIsLoading }] =
    useUpdateProductDetailsMutation();

  const [
    updateProductMainImage,
    { isLoading: updateProductMainImageIsLoading },
  ] = useUpdateProductMainImageMutation();

  const [updateProductImages, { isLoading: updateProductImagesIsLoading }] =
    useUpdateProductImagesMutation();

  const [quantityToPurchase, setQuantityToPurchase] = useState(1);
  const [isTransparentPopupOpen, setIsTransparentPopupOpen] = useState(false);
  const [avgRating, setAvgRating] = useState(ratingsAverage * 10);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditNameMode, setIsEditNameMode] = useState(false);
  const [isEditDescriptionMode, setIsEditDescriptionMode] = useState(false);
  const [isEditPriceMode, setIsEditPriceMode] = useState(false);
  const [isEditQuantityInStockMode, setIsEditQuantityInStockMode] =
    useState(false);

  const updateProductDetailsSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.string(),
    quantityInStock: z.string(),
  });

  const methods = useForm({
    defaultValues: {
      name,
      description,
      price,
      quantityInStock,
    },
    resolver: zodResolver(updateProductDetailsSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

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
    setQuantityToPurchase((value) => Number(value) - 1);
  };

  const incrementQuantityToPurchase = () => {
    setQuantityToPurchase((value) => Number(value) + 1);
  };

  const changeQuantityToPurchase = (event) => {
    setQuantityToPurchase(event.target.value);
  };

  const addToCartOnClickHandler = () => {
    addProductToCart({ quantity: quantityToPurchase, productId });
    if (addProductIsSuccess) {
      setIsTransparentPopupOpen(true);
      setTimeout(() => {
        setIsTransparentPopupOpen(false);
      }, 3000);
    }
  };

  const removeProductOnClickHandler = async () => {
    await deleteProduct({ shopId, productId });
    navigate('/');
  };

  const onSubmit = async (data) => {
    await updateProductDetails(data);

    if (isEditNameMode) return disableEditNameMode();
    if (isEditDescriptionMode) return disableEditDescriptionMode();
    if (isEditPriceMode) return disableEditPriceMode();
    if (isEditQuantityInStockMode) return disableEditQuantityInStockMode();
  };

  return (
    <FormProvider>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ProductInfo>
          {isEditNameMode ? (
            <div>
              <label>
                <h5>name:</h5>
              </label>
              <ProductDataInputFlexWrapper>
                <StyledInput placeholder="Name" name="name" />
                <div>
                  <Button onClick={disableEditNameMode}>Cancel</Button>
                  <Button type="submit">Update</Button>
                </div>
              </ProductDataInputFlexWrapper>
            </div>
          ) : (
            <div>
              <div>
                <h5>name:</h5>
              </div>
              <ProductDataValueFlexWrapper>
                <Value>{name}</Value>
                <EditIconButton
                  onClick={enableEditNameMode}
                  disabled={isEditMode}
                >
                  <EditIcon width="2rem" />
                </EditIconButton>
              </ProductDataValueFlexWrapper>
            </div>
          )}
          <ProductInfoStatsContainer>
            <ProductInfoStatsAvgRating>
              <RatingsAverage>{ratingsAverage}</RatingsAverage>
              <ProductInfoStatsAvgRatingStars>
                {[...Array(5)].map((star, idx) => (
                  <StarGradientIcon
                    width="3rem"
                    gradient={
                      avgRating - idx * 10 >= 10 ? 10 : avgRating - idx * 10
                    }
                  />
                ))}
              </ProductInfoStatsAvgRatingStars>
            </ProductInfoStatsAvgRating>
            <ProductInfoStatsRatingQuantityContainer>
              <ProductInfoStatsRatingQuantity>
                {ratingsQuantity} Ratings
              </ProductInfoStatsRatingQuantity>
            </ProductInfoStatsRatingQuantityContainer>
            <ProductInfoStatsProductsSoldContainer>
              <ProductInfoStatsProductsSold>
                {quantitySold} Sold
              </ProductInfoStatsProductsSold>
            </ProductInfoStatsProductsSoldContainer>
          </ProductInfoStatsContainer>
          <DescriptionContainer>
            <Description>{description}</Description>
          </DescriptionContainer>
          <PriceContainer>
            <Price>&#8369;{price}</Price>
          </PriceContainer>
          {isOwner ? (
            <>
              <QuantityInStockContainer>
                <QuantityInStock>
                  {isOutOfStock
                    ? 'Out of stock'
                    : `${quantityInStock} units available`}
                </QuantityInStock>
              </QuantityInStockContainer>
              <AddToCartButtonContainer>
                <RemoveProductButton
                  onClick={removeProductOnClickHandler}
                  disabled={deleteProductIsLoading}
                >
                  Remove Product
                </RemoveProductButton>
              </AddToCartButtonContainer>
            </>
          ) : (
            <>
              <QuantityControllerContainer>
                <QuantityContainer>
                  <Quantity>Quantity</Quantity>
                </QuantityContainer>
                <QuantityTogglerInput
                  decrementQuantityToggle={decrementQuantityToPurchase}
                  incrementQuantityToggle={incrementQuantityToPurchase}
                  onChangeHandler={changeQuantityToPurchase}
                  QuantityInputValue={quantityToPurchase}
                />
                <QuantityInStockContainer>
                  <QuantityInStock>
                    {isOutOfStock
                      ? 'Out of stock'
                      : `${quantityInStock} units available`}
                  </QuantityInStock>
                </QuantityInStockContainer>
              </QuantityControllerContainer>
              <AddToCartButtonContainer>
                <AddToCartButton
                  onClick={addToCartOnClickHandler}
                  disabled={addProductIsLoading}
                >
                  Add To Cart
                </AddToCartButton>
              </AddToCartButtonContainer>
            </>
          )}

          <Socials />
          {isTransparentPopupOpen ? (
            <TransparentPopup>
              <CheckIcon width="3rem" />
              <h3>Item has been added to your cart!</h3>
            </TransparentPopup>
          ) : null}
        </ProductInfo>
      </Form>
    </FormProvider>
  );
};

export default ProductHeaderInfo;
