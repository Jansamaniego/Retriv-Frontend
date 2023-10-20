import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Card, StyledModal } from 'components/common';

interface OrderDetailsProps {
  totalPrice: number;
  totalQuantity: number;
  isLoading: boolean;
}

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

const OrderDetails: React.FC<OrderDetailsProps> = ({
  totalPrice,
  totalQuantity,
  isLoading,
}) => {
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
          <h5>Units total:</h5>
          <h5>{totalQuantity} units</h5>
        </OrderDetailContainer>
        <OrderDetailContainer>
          <h5>Payment total:</h5>
          <h5>&#8369;{totalPrice}</h5>
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
