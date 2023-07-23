import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import styled from 'styled-components';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Card } from '../common';
import { useFormContext } from 'react-hook-form';

const PaymentFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const PaymentMethodSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
`;

const PaymentMethodTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PaymentMethodTitleWrapper = styled.div``;

const PaymentMethodTitle = styled.h4`
  color: ${(props) => props.theme.neutral[0]};
`;

const PaymentMethodSelectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  cursor: pointer;
`;

const PaymentMethodSelectionWrapper = styled.div``;

const PaymentMethodCashSelectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid
    ${(props) => (props.selected ? props.theme.primary.main : null)};
`;

const PaymentMethodCardSelectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid
    ${(props) => (props.selected ? null : props.theme.primary.main)};
`;

const PaymentMethodCashSelection = styled.h5`
  color: ${(props) => (props.selected ? props.theme.primary.main : null)};
`;

const PaymentMethodCardSelection = styled.h5`
  color: ${(props) => (props.selected ? null : props.theme.primary.main)};
`;

const Payment = ({ isCash, setIsCash }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const cashSelectionOnClickHandler = () => {
    setIsCash(true);
    setValue('paymentMethod', 'cash');
  };

  const cardSelectionOnClickHandler = () => {
    setIsCash(false);
    setValue('paymentMethod', 'card');
  };

  return (
    <Card>
      <PaymentFlexWrapper>
        <PaymentMethodSelectContainer>
          <PaymentMethodTitleContainer>
            <PaymentMethodTitleWrapper>
              <PaymentMethodTitle>Payment Method</PaymentMethodTitle>
            </PaymentMethodTitleWrapper>
          </PaymentMethodTitleContainer>
          <PaymentMethodSelectionContainer>
            <PaymentMethodSelectionWrapper
              onClick={cashSelectionOnClickHandler}
            >
              <PaymentMethodCashSelectionWrapper selected={isCash}>
                <PaymentMethodCashSelection selected={isCash}>
                  Cash on Delivery
                </PaymentMethodCashSelection>
              </PaymentMethodCashSelectionWrapper>
            </PaymentMethodSelectionWrapper>
            <PaymentMethodSelectionContainer>
              <PaymentMethodCardSelectionWrapper
                selected={isCash}
                onClick={cardSelectionOnClickHandler}
              >
                <PaymentMethodCardSelection selected={isCash}>
                  Card
                </PaymentMethodCardSelection>
              </PaymentMethodCardSelectionWrapper>
            </PaymentMethodSelectionContainer>
            <input type="hidden" {...register('paymentMethod')} />
          </PaymentMethodSelectionContainer>
        </PaymentMethodSelectContainer>

        {isCash ? null : (
          <>
            <PaymentElement id="payment-element" />
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </>
        )}
      </PaymentFlexWrapper>
    </Card>
  );
};

export default Payment;
