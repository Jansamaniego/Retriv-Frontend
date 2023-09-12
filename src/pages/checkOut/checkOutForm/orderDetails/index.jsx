import React from 'react';
import styled from 'styled-components';
import { Button, Card, StyledModal } from '../../../../components/common';
import { useConfirmPaymentIntentMutation } from '../../../../redux/services/paymentIntentApi';
import { useState } from 'react';

const OrderDetailsFlexContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 1.6rem;
`;

const OrderDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 40rem;
  min-width: 20rem;
  width: 100%;
`;

const OrderDetailLabel = styled.h5``;

const OrderDetailValue = styled.h5``;

const OrderDetails = ({ totalPrice, totalQuantity, isLoading }) => {
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);

  const openCreateOrderModal = () => {
    setIsCreateOrderModalOpen(true);
  };

  const closeCreateOrderModal = () => {
    setIsCreateOrderModalOpen(false);
  };

  return (
    <Card>
      <OrderDetailsFlexContainer>
        <OrderDetailContainer>
          <OrderDetailLabel>Units total:</OrderDetailLabel>
          <OrderDetailValue>{totalQuantity} units</OrderDetailValue>
        </OrderDetailContainer>
        <OrderDetailContainer>
          <OrderDetailLabel>Payment total:</OrderDetailLabel>
          <OrderDetailValue>&#8369;{totalPrice}</OrderDetailValue>
        </OrderDetailContainer>
        <Button onClick={openCreateOrderModal} disabled={isLoading}>
          Place Order
        </Button>
      </OrderDetailsFlexContainer>
      {isCreateOrderModalOpen && (
        <StyledModal
          isModalOpen={isCreateOrderModalOpen}
          closeModal={closeCreateOrderModal}
        >
          Are you sure you want to confirm your order?
        </StyledModal>
      )}
    </Card>
  );
};

export default OrderDetails;
