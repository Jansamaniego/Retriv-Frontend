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

const OrderDetailText = styled.h5`
  color: ${(props) => props.theme.neutral.text};
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
          <OrderDetailText>Units total:</OrderDetailText>
          <OrderDetailText>{totalQuantity} units</OrderDetailText>
        </OrderDetailContainer>
        <OrderDetailContainer>
          <OrderDetailText>Payment total:</OrderDetailText>
          <OrderDetailText>&#8369;{totalPrice}</OrderDetailText>
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
