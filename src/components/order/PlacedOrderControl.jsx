import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button, Select, StyledModal } from '../common';
import {
  useCancelOrderMutation,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from '../../redux/services/orderApi';
import { Navigate, useNavigate } from 'react-router-dom';

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

const StyledSelect = styled(Select)`
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  width: 20rem;
`;

const PlacedOrderControl = ({ orderId, status }) => {
  const navigate = useNavigate();
  const [isUpdateOrderStatusModalOpen, setIsUpdateOrderStatusModalOpen] =
    useState(false);
  const [isCancelOrderModalOpen, setIsCancelOrderModalOpen] = useState(false);
  const [updateOrderStatus, { isLoading: updateOrderStatusIsLoading }] =
    useUpdateOrderStatusMutation();
  const [cancelOrder, { isLoading: cancelOrderIsLoading }] =
    useCancelOrderMutation();
  const loggedInUser = useSelector((state) => state.userState.user);
  const [orderStatus, setOrderStatus] = useState(status);
  const { role } = loggedInUser;

  console.log(status);

  const updateOrderStatusOnClickHandler = async () => {
    if (STATUSENUM.includes(orderStatus)) {
      await updateOrderStatus({ status: orderStatus, id: orderId });
    } else {
      return;
    }
  };

  const cancelOrderHandler = async () => {
    await cancelOrder(orderId);
    if (!cancelOrderIsLoading) {
      navigate('/my-orders');
    }
  };

  const onChangeHandler = (event) => {
    setOrderStatus(event.target.value);
  };

  const openCancelOrderModal = () => {
    setIsCancelOrderModalOpen(true);
  };

  const closeCancelOrderModal = () => {
    setIsCancelOrderModalOpen(false);
  };

  const openUpdateOrderStatusModal = () => {
    setIsUpdateOrderStatusModalOpen(true);
  };

  const closeUpdateOrderStatusModal = () => {
    setIsUpdateOrderStatusModalOpen(false);
  };

  return (
    <PlacedOrderControlFlexWrapper>
      {role === 'admin' ? (
        <PlacedOrderControlFlexContainer>
          <StyledSelect
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
          </StyledSelect>
          <StyledButton onClick={openUpdateOrderStatusModal}>
            Update Status
          </StyledButton>
        </PlacedOrderControlFlexContainer>
      ) : (
        ['Processing', 'Not Processed'].includes(status) && (
          <StyledButton onClick={openCancelOrderModal}>
            Cancel Order
          </StyledButton>
        )
      )}
      {isCancelOrderModalOpen && (
        <StyledModal
          isModalOpen={isCancelOrderModalOpen}
          closeModal={closeCancelOrderModal}
          onClick={cancelOrderHandler}
          isLoading={cancelOrderIsLoading}
        >
          Are you sure you want to cancel your order?
        </StyledModal>
      )}
      {isUpdateOrderStatusModalOpen && (
        <StyledModal
          isModalOpen={isUpdateOrderStatusModalOpen}
          closeModal={closeUpdateOrderStatusModal}
          onClick={updateOrderStatusOnClickHandler}
          isLoading={updateOrderStatusIsLoading}
        >
          Are you sure you want to update order status to &quot;
          {orderStatus.toLowerCase()}&quot; ?
        </StyledModal>
      )}
    </PlacedOrderControlFlexWrapper>
  );
};

export default PlacedOrderControl;
