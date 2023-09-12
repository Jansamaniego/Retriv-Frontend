import React from 'react';
import styled from 'styled-components';

const OrderItemContainer = styled.div``;

const OrderItemFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderItemListProductHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15rem;
`;

const OrderItemListColumnHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
`;

const OrderItemListColumnHeader = styled.h5``;

const OrderItemListHeader = () => {
  return (
    <>
      <OrderItemContainer>
        <OrderItemFlexWrapper>
          <OrderItemListProductHeaderContainer>
            <OrderItemListColumnHeader>Product</OrderItemListColumnHeader>
          </OrderItemListProductHeaderContainer>
          <OrderItemListColumnHeaderContainer>
            <OrderItemListColumnHeader>Name</OrderItemListColumnHeader>
          </OrderItemListColumnHeaderContainer>
          <OrderItemListColumnHeaderContainer>
            <OrderItemListColumnHeader>Unit Price</OrderItemListColumnHeader>
          </OrderItemListColumnHeaderContainer>
          <OrderItemListColumnHeaderContainer>
            <OrderItemListColumnHeader>Quantity</OrderItemListColumnHeader>
          </OrderItemListColumnHeaderContainer>
          <OrderItemListColumnHeaderContainer>
            <OrderItemListColumnHeader>Total Price</OrderItemListColumnHeader>
          </OrderItemListColumnHeaderContainer>
        </OrderItemFlexWrapper>
      </OrderItemContainer>
    </>
  );
};

export default OrderItemListHeader;
