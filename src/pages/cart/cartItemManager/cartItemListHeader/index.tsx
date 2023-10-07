import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../../components/common';

const StyledCard = styled(Card)`
  @media (max-width: 900px) {
    display: none;
  }
`;

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
  min-width: 10rem;
  max-width: 15rem;
  width: 100%;
`;

const CartItemListColumnHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  max-width: 30rem;
  width: 100%;
`;

const CartItemListColumnHeader = styled.h5``;

const CartItemListHeader: React.FC = () => {
  return (
    <StyledCard>
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
    </StyledCard>
  );
};

export default CartItemListHeader;
