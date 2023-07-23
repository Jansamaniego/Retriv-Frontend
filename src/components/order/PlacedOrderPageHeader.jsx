import React from 'react';
import styled from 'styled-components';
import { Card } from '../common';

const PlacedOrderPageHeaderFlexWrapper = styled.div`
  display: flex;
`;

const PlacedOrderPageHeader = ({ orderId, dateOfPurchase }) => {
  return (
    <Card>
      <PlacedOrderPageHeaderFlexWrapper>
        <h3>Order {orderId}</h3>
        <h4>{dateOfPurchase}</h4>
      </PlacedOrderPageHeaderFlexWrapper>
    </Card>
  );
};

export default PlacedOrderPageHeader;
