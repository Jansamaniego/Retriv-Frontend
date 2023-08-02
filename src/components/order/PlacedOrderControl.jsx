import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button, Select } from '../common';
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from '../../redux/services/orderApi';

const STATUSENUM = [
  'Not Processed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
];

const PlacedOrderControlFlexWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const PlacedOrderControlFlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 20rem;
`;

const PlacedOrderControl = ({ orderId, status }) => {
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const loggedInUser = useSelector((state) => state.userState.user);
  const [orderStatus, setOrderStatus] = useState(status);
  const { role } = loggedInUser;

  const updateOrderStatusHandler = () => {
    if (STATUSENUM.includes(orderStatus)) {
      updateOrderStatus({ status: orderStatus, id: orderId });
    } else {
      return;
    }
  };

  const cancelOrderHandler = () => {
    updateOrderStatus({ status: 'Cancelled', id: orderId });
  };

  const onChangeHandler = (event) => {
    setOrderStatus(event.target.value);
  };

  return (
    <PlacedOrderControlFlexWrapper>
      {role === 'admin' ? (
        <PlacedOrderControlFlexContainer>
          <Select
            value={orderStatus}
            onChange={onChangeHandler}
            marginBottom={0}
          >
            <option value="Not Processed">Not Processed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </Select>
          <StyledButton onClick={updateOrderStatusHandler}>
            Update Status
          </StyledButton>
        </PlacedOrderControlFlexContainer>
      ) : (
        <StyledButton onClick={cancelOrderHandler}>Cancel Order</StyledButton>
      )}
    </PlacedOrderControlFlexWrapper>
  );
};

export default PlacedOrderControl;
