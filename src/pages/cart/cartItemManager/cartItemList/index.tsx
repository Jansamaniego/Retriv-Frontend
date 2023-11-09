import React from 'react';
import styled from 'styled-components';

import { ICartItem } from 'types';
import CartItemItem from './cartItemItem';

interface ICartItemListProps {
  cartItems: ICartItem[];
}

const CartItemListFlexWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  list-style: none;
`;

const CartItemList: React.FC<ICartItemListProps> = ({ cartItems }) => {
  return (
    <CartItemListFlexWrapper>
      {cartItems.map((cartItem, idx) => (
        <CartItemItem
          key={cartItem.id}
          cartItemIndex={idx}
          cartItem={cartItem}
        />
      ))}
    </CartItemListFlexWrapper>
  );
};

export default CartItemList;
