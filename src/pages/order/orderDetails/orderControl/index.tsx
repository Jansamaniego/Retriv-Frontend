import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from 'redux/store';
import {
  useCancelOrderMutation,
  useUpdateOrderStatusMutation,
} from 'redux/services/orderApi/orderApi';
import { Button, Select, StyledModal } from 'components/common';

interface IOrderControlProps {
  orderId: string;
  status: string;
}

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

const OrderControl: React.FC<IOrderControlProps> = ({ orderId, status }) => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state: RootState) => state.userState.user);
  const [isUpdateOrderStatusModalOpen, setIsUpdateOrderStatusModalOpen] =
    useState(false);
  const [isCancelOrderModalOpen, setIsCancelOrderModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(status);
  const [updateOrderStatus, { isLoading: updateOrderStatusIsLoading }] =
    useUpdateOrderStatusMutation();
  const [cancelOrder, { isLoading: cancelOrderIsLoading }] =
    useCancelOrderMutation();
  const { role } = loggedInUser || {};

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

  const onChangeHandler = (event: ChangeEvent) => {
    setOrderStatus((event.target as HTMLInputElement).value);
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

export default OrderControl;
