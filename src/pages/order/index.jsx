import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../redux/services/orderApi';
import OrderItemList from './orderItemList';
import OrderTracker from './orderTracker';
import OrderHeader from './orderHeader';
import OrderDetails from './orderDetails';

const PlacedOrderPageFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Order = () => {
  const { orderId } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);

  if (isLoading) return <h3>Loading...</h3>;

  const { products, _id, dateOfPurchase, status } = order;

  return (
    <PlacedOrderPageFlexWrapper>
      <OrderHeader orderId={_id} dateOfPurchase={dateOfPurchase} />
      <OrderTracker orderStatus={status} />
      <OrderItemList items={products} />
      <OrderDetails orderId={orderId} />
    </PlacedOrderPageFlexWrapper>
  );
};
