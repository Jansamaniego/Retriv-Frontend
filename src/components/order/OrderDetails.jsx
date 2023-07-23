import React from 'react';
import styled from 'styled-components';
import { Button, Card } from '../common';
import { useConfirmPaymentIntentMutation } from '../../redux/services/paymentIntentApi';

const OrderDetailsFlexContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 1.6rem;
`;

const OrderDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40rem;
`;

const OrderDetailLabel = styled.h5``;

const OrderDetailValue = styled.h5``;

const OrderDetails = ({ totalPrice, totalQuantity, isLoading }) => {
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
        <Button type="submit" disabled={isLoading}>
          Place Order
        </Button>
      </OrderDetailsFlexContainer>
    </Card>
  );
};

export default OrderDetails;
