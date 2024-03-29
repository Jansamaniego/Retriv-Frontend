import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Button, Card, StyledModal } from 'components/common';
import { useDeleteCartMutation } from 'redux/services/cartApi/cartApi';

export interface ICartControlProps {
  totalPrice: number;
  totalQuantity: number;
}

const CartDetailsFlexWrapper = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 675px) {
    flex-direction: column;
    gap: 1.6rem;
  }

  @media (max-width: 600px) {
    flex-direction: row;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 1.6rem;
  }
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

  @media (max-width: 675px) {
    flex-direction: column;
  }

  @media (max-width: 600px) {
    flex-direction: row;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const CartDetailsQuantityAndPriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartDetailsQuantityAndPrice = styled.h5`
  color: ${(props) => props.theme.neutral.text};
`;

const CheckOutButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckOutButton = styled(Button)``;

const DeleteCartModalText = styled.h5`
  color: ${(props) => props.theme.neutral.text};
`;

const CartControl: React.FC<ICartControlProps> = ({
  totalPrice,
  totalQuantity,
}) => {
  const navigate = useNavigate();
  const [isDeleteCartModalOpen, setIsDeleteCartModalOpen] = useState(false);
  const [deleteCart, { isLoading }] = useDeleteCartMutation();

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
              Delete Cart
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
            <CheckOutButton onClick={navigateToCheckOut}>
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
          <DeleteCartModalText>
            Are you sure you want to delete your cart?
          </DeleteCartModalText>
        </StyledModal>
      )}
    </Card>
  );
};

export default CartControl;
