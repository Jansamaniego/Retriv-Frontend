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

  if (!order) return <h3>Order is not found</h3>;

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
          <h5>status: {status}</h5>
          <h5>date: {moment(dateOfPurchase).format('MMM DD YYYY')}</h5>
          <h5>payment method: {paymentMethod}</h5>
        </OrderItemDetailsFlexWrapper>
        <OrderItemDetailsFlexWrapper>
          <h5>products: {totalQuantity}</h5>
          <h5>total price: {totalPrice}</h5>
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

  if (!orders) return <h3>Order are not found</h3>;

  return orders.map(({ _id: id }) => <OrderItem key={id} id={id} />);
};

const OrderManager = () => {
  const { isLoading } = useGetOrdersQuery();

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
