import React, { useState } from 'react';
import styled from 'styled-components';
import { useGetCartQuery } from '../../redux/services/cartApi';
import { Card, Loading } from '../common';
import CartItemList from './cartItemList';
import CartItemListHeader from './cartItemListHeader';
import CartControl from './cartControl';

const CartItemListFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CartPageFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CartItemManager = () => {
  const { data: cart, isLoading } = useGetCartQuery();

  if (isLoading) return <Loading />;

  if (!cart) return <Card>Your shopping cart is empty.</Card>;

  const { items, totalPrice, totalQuantity } = cart;

  return (
    <CartPageFlexWrapper>
      <CartItemListHeader />
      <Card>
        <CartItemListFlexWrapper>
          <CartItemList cartItems={items} />
        </CartItemListFlexWrapper>
      </Card>
      <CartControl totalPrice={totalPrice} totalQuantity={totalQuantity} />
    </CartPageFlexWrapper>
  );
};

export default CartItemManager;
