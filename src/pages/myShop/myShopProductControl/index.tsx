import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IShopWithOwnerPickValues } from 'redux/services/shopApi/shopApi.types';
import { RootState, useAppDispatch } from 'redux/store';
import {
  myProfileApi,
  useUpdateDefaultShopMutation,
} from 'redux/services/myProfileApi/myProfileApi';
import { useDeleteShopMutation } from 'redux/services/shopApi/shopApi';
import { removeShop } from 'redux/features/shopSlice';
import { Button, Card, StyledModal } from 'components/common';

interface IMyShopProductControlProps {
  currentShop: IShopWithOwnerPickValues;
}

const MyShopProductControlsFlexWrapper = styled.div`
  display: flex;
`;

const AddProductButtonContainer = styled.div``;

const AddProductButton = styled(Button)``;

const MyShopProductControl: React.FC<IMyShopProductControlProps> = ({
  currentShop,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.userState.user);
  const [deleteShop, { isLoading: deleteShopIsLoading }] =
    useDeleteShopMutation();
  const [isDeleteShopModalOpen, setIsDeleteShopModalOpen] = useState(false);
  const [isUpdateDefaultShopModalOpen, setIsUpdateDefaultShopModalOpen] =
    useState(false);
  const [updateDefaultShop, { isLoading }] = useUpdateDefaultShopMutation();

  const { _id: shopId, name } = currentShop;

  const navigateToProductForm = () => {
    navigate('/add-product');
  };

  const defaultShopOnClickHandler = async () => {
    await updateDefaultShop(shopId);
  };

  const openUpdateDefaultShopModal = () => {
    setIsUpdateDefaultShopModalOpen(true);
  };

  const closeUpdateDefaultShopModal = () => {
    setIsUpdateDefaultShopModalOpen(false);
  };

  const openDeleteShopModal = () => {
    setIsDeleteShopModalOpen(true);
  };

  const closeDeleteShopModal = () => {
    setIsDeleteShopModalOpen(false);
  };

  const deleteShopOnClickHandler = async () => {
    await deleteShop(shopId);
    if (!deleteShopIsLoading) {
      const { isSuccess } = await dispatch(
        myProfileApi.endpoints.getMe.initiate(null, { forceRefetch: true })
      );

      if (isSuccess) {
        dispatch(removeShop());
      }
      navigate('/');
    }
  };

  return (
    <Card>
      <MyShopProductControlsFlexWrapper>
        <AddProductButtonContainer>
          <AddProductButton onClick={navigateToProductForm}>
            Add Product
          </AddProductButton>
        </AddProductButtonContainer>
        {currentUser && currentUser.defaultShop !== shopId && (
          <AddProductButtonContainer>
            <Button large onClick={openUpdateDefaultShopModal}>
              Set as default shop
            </Button>
          </AddProductButtonContainer>
        )}
        <AddProductButtonContainer>
          <AddProductButton
            onClick={openDeleteShopModal}
            disabled={deleteShopIsLoading}
          >
            Delete
          </AddProductButton>
        </AddProductButtonContainer>
      </MyShopProductControlsFlexWrapper>
      {isUpdateDefaultShopModalOpen && (
        <StyledModal
          isModalOpen={isUpdateDefaultShopModalOpen}
          closeModal={closeUpdateDefaultShopModal}
          isLoading={isLoading}
          onClick={defaultShopOnClickHandler}
        >
          Are you sure you want to set your default shop to {name}?
        </StyledModal>
      )}
      {isDeleteShopModalOpen && (
        <StyledModal
          isModalOpen={isDeleteShopModalOpen}
          closeModal={closeDeleteShopModal}
          onClick={deleteShopOnClickHandler}
          isLoading={deleteShopIsLoading}
        >
          Are you sure you want to delete your shop?
        </StyledModal>
      )}
    </Card>
  );
};

export default MyShopProductControl;
