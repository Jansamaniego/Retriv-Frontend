import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../redux/services/orderApi';
import PlacedOrderItemList from '../components/order/PlacedOrderItemList';
import { Card } from '../components/common';
import PlacedOrderTracker from '../components/order/PlacedOrderTracker';
import PlacedOrderPageHeader from '../components/order/PlacedOrderPageHeader';
import PlacedOrderDetails from '../components/order/PlacedOrderDetails';

const PlacedOrderPageFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PlacedOrderPage = () => {
  const { orderId } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId);
  if (isLoading) return <h3>Loading...</h3>;
  console.log(order);
  const { products, _id, dateOfPurchase, status } = order;
  return (
    <PlacedOrderPageFlexWrapper>
      <PlacedOrderPageHeader orderId={_id} dateOfPurchase={dateOfPurchase} />
      <PlacedOrderTracker orderStatus={status} />
      <PlacedOrderItemList items={products} />
      <PlacedOrderDetails orderId={orderId } />
    </PlacedOrderPageFlexWrapper>
  );
};

export default PlacedOrderPage;
