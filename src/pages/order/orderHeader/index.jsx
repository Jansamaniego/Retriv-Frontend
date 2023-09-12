import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../components/common';

const PlacedOrderPageHeaderFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const OrderHeader = ({ orderId, dateOfPurchase }) => {
  return (
    <Card>
      <PlacedOrderPageHeaderFlexWrapper>
        <h3>Order {orderId}</h3>
        <h4>{dateOfPurchase}</h4>
      </PlacedOrderPageHeaderFlexWrapper>
    </Card>
  );
};

export default OrderHeader;
