import React from 'react';
import { Card } from '../common';
import { useGetOrderByIdQuery } from '../../redux/services/orderApi';
import styled from 'styled-components';
import PlacedOrderInfo from './PlacedOrderInfo';
import PlacedOrderControl from './PlacedOrderControl';

const PlacedOrderDetailsFLexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const PlacedOrderDetails = ({ orderId }) => {
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);

  if (isLoading) return <h4>Loading...</h4>;

  console.log(order);

  return (
    <Card>
      <PlacedOrderDetailsFLexWrapper>
        <PlacedOrderInfo order={order} />
        <PlacedOrderControl orderId={orderId} status={order.status} />
      </PlacedOrderDetailsFLexWrapper>
    </Card>
  );
};

export default PlacedOrderDetails;
