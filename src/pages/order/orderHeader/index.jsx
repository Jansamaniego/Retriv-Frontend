import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../components/common';
import moment from 'moment';

const PlacedOrderPageHeaderFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 690px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }
`;

const OrderHeader = ({ orderId, dateOfPurchase }) => {
  return (
    <Card>
      <PlacedOrderPageHeaderFlexWrapper>
        <h4>Order {orderId}</h4>
        <h4>{moment(dateOfPurchase).format('yyyy-MM-DD')}</h4>
      </PlacedOrderPageHeaderFlexWrapper>
    </Card>
  );
};

export default OrderHeader;
