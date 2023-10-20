import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { useGetOrderByIdQuery } from 'redux/services/orderApi/orderApi';
import { Loading } from 'components/common';
import OrderItemList from 'pages/order/orderItemList';
import OrderTracker from 'pages/order/orderTracker';
import OrderHeader from 'pages/order/orderHeader';
import OrderDetails from 'pages/order/orderDetails';

const PlacedOrderPageFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Order = () => {
  const { orderId } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId!);

  if (isLoading) return <Loading />;

  if (!order) return <h3>Order is not found</h3>;

  const { products, _id, dateOfPurchase, status } = order;

  return (
    <PlacedOrderPageFlexWrapper>
      <OrderHeader orderId={_id} dateOfPurchase={dateOfPurchase!} />
      <OrderTracker orderStatus={status!} />
      <OrderItemList items={products} />
      <OrderDetails orderId={orderId!} />
    </PlacedOrderPageFlexWrapper>
  );
};
