import React, { useState } from 'react';
import { useGetProductByIdQuery } from '../../redux/services/productApi';
import styled from 'styled-components';
import { Button, QuantityTogglerInput, TransparentPopup } from '../common';
import { useRemoveCartItemMutation } from '../../redux/services/cartApi';
import { useEffect } from 'react';

const CartItemContainer = styled.div``;

const CartItemFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartItemImageContainer = styled.div`
  display: flex;
  justify-content: center;
  outline: 1px solid ${(props) => props.theme.primary.main};
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 15rem;

  &:hover {
    cursor: pointer;
  }
`;

const CartItemImage = styled.img`
  object-fit: cover;
  height: 15rem;
`;

const CartItemDetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
`;
const CartItemName = styled.h5``;

const CartItemUnitPrice = styled.h5``;

const CartItemQuantity = styled.h5``;

const CartItemTotalPrice = styled.h5``;

const DeleteButton = styled(Button)``;

const CartItemItem = ({
  productId,
  shopId,
  cartItemIndex,
  totalProductPrice,
  totalProductQuantity,
}) => {
  const [isTransparentPopupOpen, setIsTransparentPopupOpen] = useState(false);
  const [quantityToPurchase, setQuantityToPurchase] =
    useState(totalProductQuantity);
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

  const decrementQuantityToPurchase = () => {
    setQuantityToPurchase((value) => Number(value) - 1);
  };

  const incrementQuantityToPurchase = () => {
    setQuantityToPurchase((value) => Number(value) + 1);
  };

  const changeQuantityToPurchase = (event) => {
    setQuantityToPurchase(event.target.value);
  };

  const { name, mainImage, price } = product;

  return (
    <CartItemContainer>
      <CartItemFlexWrapper>
        <CartItemImageContainer>
          <CartItemImage src={mainImage} />
        </CartItemImageContainer>
        <CartItemDetailContainer>
          <CartItemName>{name}</CartItemName>
        </CartItemDetailContainer>
        <CartItemDetailContainer>
          <CartItemUnitPrice>&#8369;{price}</CartItemUnitPrice>
        </CartItemDetailContainer>
        <CartItemDetailContainer>
          <QuantityTogglerInput
            decrementQuantityToggle={decrementQuantityToPurchase}
            incrementQuantityToggle={incrementQuantityToPurchase}
            onChangeHandler={changeQuantityToPurchase}
            QuantityInputValue={quantityToPurchase}
          />
        </CartItemDetailContainer>
        <CartItemDetailContainer>
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

const CartItemList = ({ cartItems }) => {
  return cartItems.map(
    (
      { product, shop, _id: id, totalProductPrice, totalProductQuantity },
      idx
    ) => (
      <CartItemItem
        key={id}
        productId={product}
        cartItemIndex={idx}
        shopId={shop}
        totalProductPrice={totalProductPrice}
        totalProductQuantity={totalProductQuantity}
      />
    )
  );
};

export default CartItemList;
