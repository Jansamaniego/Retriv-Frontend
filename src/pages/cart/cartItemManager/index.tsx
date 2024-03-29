import React from 'react';
import styled from 'styled-components';

import { useGetCartQuery } from 'redux/services/cartApi/cartApi';
import { Card, Loading } from 'components/common';
import CartItemList from 'pages/cart/cartItemManager/cartItemList';
import CartItemListHeader from 'pages/cart/cartItemManager/cartItemListHeader';
import CartControl from 'pages/cart/cartItemManager/cartControl';

const CartPageFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CartItemManagerText = styled.h2`
  color: ${(props) => props.theme.neutral.text};
`;

const CartItemManager: React.FC = () => {
  const { data: cart, isLoading } = useGetCartQuery();

  if (isLoading) return <Loading />;

  if (!cart)
    return (
      <CartItemManagerText>Your shopping cart is empty.</CartItemManagerText>
    );

  const { items, totalPrice, totalQuantity } = cart;

  return (
    <CartPageFlexWrapper>
      <CartItemListHeader />
      <Card>
        <CartItemList cartItems={items} />
      </Card>
      <CartControl totalPrice={totalPrice} totalQuantity={totalQuantity} />
    </CartPageFlexWrapper>
  );
};

export default CartItemManager;
