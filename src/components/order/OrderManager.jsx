import React from 'react';
import { useGetOrdersQuery } from '../../redux/services/orderApi';
import { Card } from '../common';

const OrderCard = ({ children }) => {
  return <Card>{children}</Card>;
};

const OrderItem = ({ id }) => {
  const { order } = useGetOrdersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      order: data?.find((order) => order.id === id),
    }),
  });

  return <OrderCard>{order.name}</OrderCard>;
};

const OrderList = ({ orders }) => {
  return orders.map((id) => <OrderItem key={id} id={id} />);
};

const OrderManager = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return <OrderList orders={orders} />;
};

export default OrderManager;
