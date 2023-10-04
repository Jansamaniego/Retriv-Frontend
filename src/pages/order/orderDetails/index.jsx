import React from 'react';
import { Card } from '../../../components/common';
import { useGetOrderByIdQuery } from '../../../redux/services/orderApi/orderApi';
import styled from 'styled-components';
import OrderInfo from './orderInfo';
import OrderControl from './orderControl';

const OrderDetailsFLexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const OrderDetails = ({ orderId }) => {
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);

  if (isLoading) return <h4>Loading...</h4>;

  return (
    <Card>
      <OrderDetailsFLexWrapper>
        <OrderInfo order={order} />
        <OrderControl orderId={orderId} status={order.status} />
      </OrderDetailsFLexWrapper>
    </Card>
  );
};

export default OrderDetails;
