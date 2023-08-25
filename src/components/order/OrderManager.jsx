import React from 'react';
import { useGetOrdersQuery } from '../../redux/services/orderApi';
import { Card } from '../common';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const OrderManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2.4rem;
  row-gap: 1.6rem;
`;

const OrderItemCard = styled(Card)`
  cursor: pointer;
`;

const OrderItemFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrderItemDetailsFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderItem = ({ id }) => {
  const navigate = useNavigate();
  const { order } = useGetOrdersQuery(undefined, {
    selectFromResult: ({ data }) => {
      console.log(data);
      return {
        order: data?.find((order) => order._id === id),
      };
    },
  });

  console.log(order);

  const {
    dateOfPurchase,
    products,
    status,
    totalPrice,
    totalQuantity,
    paymentMethod,
  } = order;

  const navigateOrder = () => {
    navigate(`/order/${id}`);
  };

  return (
    <OrderItemCard onClick={navigateOrder}>
      <OrderItemFlexWrapper>
        <OrderItemDetailsFlexWrapper>
          <h5>{status}</h5>
          <h5>{dateOfPurchase}</h5>
        </OrderItemDetailsFlexWrapper>
        <OrderItemDetailsFlexWrapper>
          <h5>{totalPrice}</h5>
          <h5>{totalQuantity}</h5>
          <h5>{paymentMethod}</h5>
        </OrderItemDetailsFlexWrapper>
      </OrderItemFlexWrapper>
    </OrderItemCard>
  );
};

const OrderList = () => {
  const currentUser = useSelector((state) => state.userState.user);

  const { orders } = useGetOrdersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      orders:
        currentUser &&
        data?.filter((order) => order.user._id === currentUser.id),
    }),
  });

  console.log(orders);

  return orders.map(({ _id: id }) => <OrderItem key={id} id={id} />);
};

const OrderManager = () => {
  // const res = useGetOrdersQuery(null, {
  //   selectFromResult: ({ data }) => {
  //     return {
  //       orders:
  //         currentUser &&
  //         data?.results?.find((order) => order.user === currentUser.id),
  //     };
  //   },
  // });
  const { data: orders, isLoading } = useGetOrdersQuery();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await refetch();
  //   };

  //   fetchData();
  // }, [refetch, currentUser]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <OrderManagerGrid>
      <OrderList />
    </OrderManagerGrid>
  );
};

export default OrderManager;
