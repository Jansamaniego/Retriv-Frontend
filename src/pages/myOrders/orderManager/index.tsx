import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { IOrder } from 'types';
import { useGetOrdersQuery } from 'redux/services/orderApi/orderApi';
import { RootState } from 'redux/store';
import {
  Delivered,
  NotProcessed,
  OutForDelivery,
  Processing,
  Shipped,
} from 'assets/icons';
import { Card, Loading } from 'components/common';

interface IStatusIconContainerProps {
  active?: boolean;
}

interface IOrderItemProps {
  id: string;
}

const OrderManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2.4rem;
  row-gap: 1.6rem;

  @media (max-width: 2560px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1920px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const OrderItemCard = styled(Card)`
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
    transform-origin: center;
    box-shadow: 0 30px 45px 0 rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(-10px);
    transition: 0.2s;
  }
`;

const OrderItemFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrderItemDetailsFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
`;

const OrderItemDetailsText = styled.h5`
  color: ${(props) => props.theme.neutral.text};
`;

const StatusIconContainer = styled.div<IStatusIconContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? props.theme.primary.main : props.theme.neutral[700]};
  width: 10rem;
  height: 10rem;
`;

const OrderManagerText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

const OrderItem: React.FC<IOrderItemProps> = ({ id }) => {
  const navigate = useNavigate();
  const { order, isLoading } = useGetOrdersQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => {
      return {
        order: data?.find((order) => order._id === id),
        isLoading,
      };
    },
  });

  if (isLoading) return <Loading />;

  if (!order) return <OrderManagerText>Order is not found</OrderManagerText>;

  const { dateOfPurchase, status, totalPrice, totalQuantity, paymentMethod } =
    order;

  const navigateOrder = () => {
    navigate(`/order/${id}`);
  };

  return (
    <OrderItemCard onClick={navigateOrder}>
      <OrderItemFlexWrapper>
        <OrderItemDetailsFlexWrapper>
          <StatusIconContainer>
            {status === 'Not Processed' && <NotProcessed width="5rem" />}
            {status === 'Processing' && <Processing width="5rem" />}
            {status === 'Shipped' && <Shipped width="5rem" />}
            {status === 'Out for Delivery' && <OutForDelivery width="5rem" />}
            {status === 'Delivered' && <Delivered width="5rem" />}
          </StatusIconContainer>
          <OrderItemDetailsText>status: {status}</OrderItemDetailsText>
          <OrderItemDetailsText>
            date: {moment(dateOfPurchase).format('MMM DD YYYY')}
          </OrderItemDetailsText>
          <OrderItemDetailsText>
            payment method: {paymentMethod}
          </OrderItemDetailsText>
        </OrderItemDetailsFlexWrapper>
        <OrderItemDetailsFlexWrapper>
          <OrderItemDetailsText>products: {totalQuantity}</OrderItemDetailsText>
          <OrderItemDetailsText>total price: {totalPrice}</OrderItemDetailsText>
        </OrderItemDetailsFlexWrapper>
      </OrderItemFlexWrapper>
    </OrderItemCard>
  );
};

const OrderList = () => {
  const currentUser = useSelector((state: RootState) => state.userState.user);

  const { orders, isLoading } = useGetOrdersQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => {
      return {
        orders:
          currentUser &&
          data?.filter((order) => {
            if (typeof order.user !== 'string') {
              return order?.user?._id === currentUser.id;
            } else {
              return order?.user === currentUser.id;
            }
          }),
        isLoading,
      };
    },
  });

  if (isLoading) return <Loading />;

  if (!orders) return <OrderManagerText>Order are not found</OrderManagerText>;

  return orders.map(({ _id: id }) => <OrderItem key={id} id={id} />);
};

const OrderManager = () => {
  const { isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <OrderManagerGrid>
      <OrderList />
    </OrderManagerGrid>
  );
};

export default OrderManager;
