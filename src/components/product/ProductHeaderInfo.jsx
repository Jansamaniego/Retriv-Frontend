import React, { useState } from 'react';
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
  StarGradientIcon,
} from '../../assets/icons';
import styled from 'styled-components';
import {
  Button,
  QuantityTogglerInput,
  Socials,
  TransparentPopup,
} from '../common';
import { useAddProductToCartMutation } from '../../redux/services/cartApi';

const ProductInfo = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 50%;
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
}) => {
  const [addProductToCart, { isLoading, isSuccess }] =
    useAddProductToCartMutation();
  const [quantityToPurchase, setQuantityToPurchase] = useState(1);
  const [isTransparentPopupOpen, setIsTransparentPopupOpen] = useState(false);

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
    if (isSuccess) {
      setIsTransparentPopupOpen(true);
      setTimeout(() => {
        setIsTransparentPopupOpen(false);
      }, 3000);
    }
  };

  const avg = ratingsAverage * 10;

  return (
    <ProductInfo>
      <ProductInfoName>{name}</ProductInfoName>
      <ProductInfoStatsContainer>
        <ProductInfoStatsAvgRating>
          <RatingsAverage>{ratingsAverage}</RatingsAverage>
          <ProductInfoStatsAvgRatingStars>
            {[...Array(5)].map((star, idx) => (
              <StarGradientIcon
                width="3rem"
                gradient={avg - idx * 10 >= 10 ? 10 : avg - idx * 10}
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
        <AddToCartButton onClick={addToCartOnClickHandler}>
          Add To Cart
        </AddToCartButton>
      </AddToCartButtonContainer>
      <Socials />
      {isTransparentPopupOpen ? (
        <TransparentPopup>
          <CheckIcon width="3rem" />
          <h3>Item has been added to your cart!</h3>
        </TransparentPopup>
      ) : null}
    </ProductInfo>
  );
};

export default ProductHeaderInfo;
