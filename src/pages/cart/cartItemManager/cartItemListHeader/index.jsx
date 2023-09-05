import React from 'react';
import styled from 'styled-components';
import { Card } from '../common';

const CartItemContainer = styled.div``;

const CartItemFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartItemListProductHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15rem;
`;

const CartItemListColumnHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
`;

const CartItemListColumnHeader = styled.h5``;

const CartItemListHeader = () => {
  return (
    <Card>
      <CartItemContainer>
        <CartItemFlexWrapper>
          <CartItemListProductHeaderContainer>
            <CartItemListColumnHeader>Product</CartItemListColumnHeader>
          </CartItemListProductHeaderContainer>
          <CartItemListColumnHeaderContainer>
            <CartItemListColumnHeader>Name</CartItemListColumnHeader>
          </CartItemListColumnHeaderContainer>
          <CartItemListColumnHeaderContainer>
            <CartItemListColumnHeader>Unit Price</CartItemListColumnHeader>
          </CartItemListColumnHeaderContainer>
          <CartItemListColumnHeaderContainer>
            <CartItemListColumnHeader>Quantity</CartItemListColumnHeader>
          </CartItemListColumnHeaderContainer>
          <CartItemListColumnHeaderContainer>
            <CartItemListColumnHeader>Total Price</CartItemListColumnHeader>
          </CartItemListColumnHeaderContainer>
          <CartItemListColumnHeaderContainer></CartItemListColumnHeaderContainer>
        </CartItemFlexWrapper>
      </CartItemContainer>
    </Card>
  );
};

export default CartItemListHeader;
