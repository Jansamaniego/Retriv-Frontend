import React, { ChangeEvent, useState, useEffect } from 'react';
import styled from 'styled-components';

import { useGetProductByIdQuery } from 'redux/services/productApi/productApi';
import { useRemoveCartItemMutation } from 'redux/services/cartApi/cartApi';
import {
  Button,
  QuantityTogglerInput,
  TransparentPopup,
} from 'components/common';
import { ICartItem } from 'types';

interface ICartItemItemProps {
  cartItem: ICartItem;
  cartItemIndex: number;
}

const CartItemContainer = styled.li``;

const CartItemFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1.6rem;
  }

  @media (max-width: 635px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1.6rem;
  }

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

const CartItemImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 10rem;
  max-width: 15rem;
  width: 100%;

  @media (max-width: 900px) {
    max-width: 30rem;
  }
`;

const CartItemImageContainer = styled.div`
  display: flex;
  justify-content: center;
  outline: 1px solid ${(props) => props.theme.primary.main};
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
`;

const CartItemImage = styled.img`
  width: 16rem;
  height: 12rem;
  object-fit: cover;
`;

const CartItemDetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  max-width: 30rem;
  width: 100%;
`;

const QuantityTogglerInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  max-width: 30rem;
  width: 100%;

  @media (max-width: 900px) {
    grid-row: 1;
    grid-column: 2;
  }
`;

const QuantityTogglerInputLabel = styled.h5`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const CartItemUnitPriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  max-width: 30rem;
  width: 100%;
  @media (max-width: 900px) {
    grid-row: 3;
  }
`;

const CartItemName = styled.h5``;

const PriceLabel = styled.h5`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const CartItemUnitPrice = styled.h5``;

const TotalPriceLabel = styled.h5`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const CartItemTotalPrice = styled.h5``;

const DeleteButton = styled(Button)``;

const CartItemItem: React.FC<ICartItemItemProps> = ({
  cartItem: {
    totalProductQuantity,
    shop: shopId,
    product: productId,
    totalProductPrice,
  },
  cartItemIndex,
}) => {
  const [isTransparentPopupOpen, setIsTransparentPopupOpen] =
    useState<boolean>(false);
  const [quantityToPurchase, setQuantityToPurchase] =
    useState<number>(totalProductQuantity);
  const { data: product, isLoading } = useGetProductByIdQuery({
    shopId,
    productId,
  });

  const [removeCartItem, { isLoading: removeCartItemIsLoading, isSuccess }] =
    useRemoveCartItemMutation();

  const DeleteCartItemOnClickHandler = async () => {
    await removeCartItem({ productId, cartItemIndex });
  };

  useEffect(() => {
    const toggleTransparentPopup = () => {
      setIsTransparentPopupOpen(true);
      setTimeout(() => {
        setIsTransparentPopupOpen(false);
      }, 3000);
    };

    if (!removeCartItemIsLoading && isSuccess) {
      toggleTransparentPopup();
    }
  }, [removeCartItemIsLoading, isSuccess]);

  if (isLoading) return <h1>Loading...</h1>;

  if (!product) return <h1>No product found!</h1>;

  const decrementQuantityToPurchase = () => {
    if (quantityToPurchase <= 1) return;
    setQuantityToPurchase((value) => Number(value) - 1);
  };

  const incrementQuantityToPurchase = () => {
    setQuantityToPurchase((value) => Number(value) + 1);
  };

  const changeQuantityToPurchase = (event: ChangeEvent) => {
    setQuantityToPurchase(Number((event.target as HTMLInputElement).value));
  };

  const { name, mainImage, price } = product;

  return (
    <CartItemContainer>
      <CartItemFlexWrapper>
        <CartItemImageWrapper>
          <CartItemImageContainer>
            <CartItemImage src={mainImage} />
          </CartItemImageContainer>
        </CartItemImageWrapper>
        <CartItemDetailContainer>
          <CartItemName>{name}</CartItemName>
        </CartItemDetailContainer>
        <CartItemUnitPriceContainer>
          <PriceLabel>Price: &nbsp;</PriceLabel>
          <CartItemUnitPrice>&#8369;{price}</CartItemUnitPrice>
        </CartItemUnitPriceContainer>
        <QuantityTogglerInputContainer>
          <QuantityTogglerInputLabel>
            Quantity: &nbsp;
          </QuantityTogglerInputLabel>
          <QuantityTogglerInput
            decrementQuantityToggle={decrementQuantityToPurchase}
            incrementQuantityToggle={incrementQuantityToPurchase}
            onChangeHandler={changeQuantityToPurchase}
            QuantityInputValue={quantityToPurchase}
          />
        </QuantityTogglerInputContainer>
        <CartItemDetailContainer>
          <TotalPriceLabel>Total Price: &nbsp;</TotalPriceLabel>
          <CartItemTotalPrice>&#8369;{totalProductPrice}</CartItemTotalPrice>
        </CartItemDetailContainer>
        <CartItemDetailContainer>
          <DeleteButton
            onClick={DeleteCartItemOnClickHandler}
            disabled={removeCartItemIsLoading}
          >
            Delete
          </DeleteButton>
        </CartItemDetailContainer>
      </CartItemFlexWrapper>
      {isTransparentPopupOpen && (
        <TransparentPopup>
          <h3>Item has been removed from your cart!</h3>
        </TransparentPopup>
      )}
    </CartItemContainer>
  );
};

export default CartItemItem;
