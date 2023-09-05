import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Card, StyledModal } from '../common';
import { useNavigate } from 'react-router-dom';
import { useDeleteCartMutation } from '../../redux/services/cartApi';

const CartDetailsFlexWrapper = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartDetailsControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

const CartDetailsDeleteButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartDetailsDeleteButton = styled(Button)``;

const CartDetailsTotalAndCheckOut = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const CartDetailsQuantityAndPriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartDetailsQuantityAndPrice = styled.h5``;

const CheckOutButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckOutButton = styled(Button)``;

const CartControl = ({ totalPrice, totalQuantity }) => {
  const navigate = useNavigate();
  const [isDeleteCartModalOpen, setIsDeleteCartModalOpen] = useState(false);
  const [deleteCart, { isLoading, isSuccess }] = useDeleteCartMutation();
  const navigateToCheckOut = () => {
    navigate('/checkout');
  };

  const openDeleteCartModal = () => {
    setIsDeleteCartModalOpen(true);
  };

  const closeDeleteCartModal = () => {
    setIsDeleteCartModalOpen(false);
  };

  const deleteCartOnClickHandler = async () => {
    await deleteCart();
  };

  return (
    <Card>
      <CartDetailsFlexWrapper>
        <CartDetailsControls>
          <CartDetailsDeleteButtonContainer>
            <CartDetailsDeleteButton onClick={openDeleteCartModal}>
              Delete
            </CartDetailsDeleteButton>
          </CartDetailsDeleteButtonContainer>
        </CartDetailsControls>
        <CartDetailsTotalAndCheckOut>
          <CartDetailsQuantityAndPriceContainer>
            <CartDetailsQuantityAndPrice>
              Total &#40;{totalQuantity} items&#41;: &#8369;{totalPrice}
            </CartDetailsQuantityAndPrice>
          </CartDetailsQuantityAndPriceContainer>
          <CheckOutButtonContainer>
            <CheckOutButton superLarge onClick={navigateToCheckOut}>
              Check Out
            </CheckOutButton>
          </CheckOutButtonContainer>
        </CartDetailsTotalAndCheckOut>
      </CartDetailsFlexWrapper>
      {isDeleteCartModalOpen && (
        <StyledModal
          isModalOpen={isDeleteCartModalOpen}
          closeModal={closeDeleteCartModal}
          isLoading={isLoading}
          onClick={deleteCartOnClickHandler}
        >
          Are you sure you want to delete your cart?
        </StyledModal>
      )}
    </Card>
  );
};

export default CartControl;
