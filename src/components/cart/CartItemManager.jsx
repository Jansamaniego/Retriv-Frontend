import React from 'react';
import styled from 'styled-components';
import { useGetCartQuery } from '../../redux/services/cartApi';
import { Card } from '../common';
import CartItemList from './CartItemList';
import CartItemListHeader from './CartItemListHeader';
import CartDetailsWithCheckOutButton from './CartDetailsWithCheckOutButton';

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

  if (isLoading) return <h1>Loading...</h1>;

  if (!cart) return <Card>Your shopping cart is empty.</Card>;

  console.log(cart);

  const { items, totalPrice, totalQuantity } = cart;

  return (
    <CartPageFlexWrapper>
      <CartItemListHeader />
      <Card>
        <CartItemListFlexWrapper>
          <CartItemList cartItems={items} />
        </CartItemListFlexWrapper>
      </Card>
      <CartDetailsWithCheckOutButton
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
      />
    </CartPageFlexWrapper>
  );
};

export default CartItemManager;
