import React from 'react';
import { useGetOrdersQuery } from '../../../redux/services/orderApi/orderApi';
import { Card } from '../../../components/common';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  Delivered,
  NotProcessed,
  OutForDelivery,
  Processing,
  Shipped,
} from '../../../assets/icons';
import moment from 'moment';

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

const StatusIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? props.theme.primary.main : props.theme.neutral[700]};
  width: 10rem;
  height: 10rem;
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
