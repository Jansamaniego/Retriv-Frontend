import React from 'react';
import styled from 'styled-components';
import { useGetCartQuery } from '../../redux/services/cartApi';
import { Card } from '../common';
import CartItemList from './CartItemList';

const CartItemListFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CartItemManager = () => {
  const { data: cart, isLoading } = useGetCartQuery();

  if (isLoading) return <h1>Loading...</h1>;

  if (!cart) return <Card>Your shopping cart is empty.</Card>;

  console.log(cart);

  return (
    <Card>
      <CartItemListFlexWrapper>
        <CartItemList cartItems={cart.items} />
      </CartItemListFlexWrapper>
    </Card>
  );
};

export default CartItemManager;
