import React from 'react';
import styled from 'styled-components';
import { MinusIcon, PlusIcon } from '../../../assets/icons';

const QuantityControlContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityControl = styled.input.attrs({
  type: 'number',
})`
  text-align: center;
  min-height: 100%;
  font-size: 1.6rem;
  width: 4.8rem;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const DecrementQuantityButton = styled.button`
  cursor: pointer;
`;

const IncrementQuantityButton = styled.button`
  cursor: pointer;
`;

export const QuantityTogglerInput = ({
  decrementQuantityToggle,
  incrementQuantityToggle,
  onChangeHandler,
  QuantityInputValue,
}) => {
  return (
    <QuantityControlContainer>
      <DecrementQuantityButton onClick={decrementQuantityToggle}>
        <MinusIcon width="2rem" />
      </DecrementQuantityButton>
      <QuantityControl value={QuantityInputValue} onChange={onChangeHandler} />
      <IncrementQuantityButton onClick={incrementQuantityToggle}>
        <PlusIcon width="2rem" />
      </IncrementQuantityButton>
    </QuantityControlContainer>
  );
};
