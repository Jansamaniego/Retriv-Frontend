import React from 'react';
import styled from 'styled-components';

import { useGetOrderByIdQuery } from 'redux/services/orderApi/orderApi';
import { Card, Loading } from 'components/common';
import OrderInfo from 'pages/order/orderDetails/orderInfo';
import OrderControl from 'pages/order/orderDetails/orderControl';

interface IOrderDetailsProps {
  orderId: string;
}

const OrderDetailsFLexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const OrderDetails: React.FC<IOrderDetailsProps> = ({ orderId }) => {
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);

  if (isLoading) return <Loading />;

  if (!order) return <h4>Order is not found</h4>;

  return (
    <Card>
      <OrderDetailsFLexWrapper>
        <OrderInfo order={order} />
        <OrderControl orderId={orderId} status={order.status!} />
      </OrderDetailsFLexWrapper>
    </Card>
  );
};

export default OrderDetails;
