import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Card } from 'components/common';

interface IOrderHeaderProps {
  orderId: string;
  dateOfPurchase: Date;
}

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

const OrderHeaderText = styled.h4`
  color: ${(props) => props.theme.neutral.text};
`;

const OrderHeader: React.FC<IOrderHeaderProps> = ({
  orderId,
  dateOfPurchase,
}) => {
  return (
    <Card>
      <PlacedOrderPageHeaderFlexWrapper>
        <OrderHeaderText>Order {orderId}</OrderHeaderText>
        <OrderHeaderText>
          {moment(dateOfPurchase).format('yyyy-MM-DD')}
        </OrderHeaderText>
      </PlacedOrderPageHeaderFlexWrapper>
    </Card>
  );
};

export default OrderHeader;
