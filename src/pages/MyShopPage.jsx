import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ShopHeader from '../components/shop/ShopHeader';
import ShopProducts from '../components/shop/ShopProducts';
import styled from 'styled-components';
import { useGetShopRatingsQuery } from '../redux/services/ratings/shopRatingsApi';
import MyShopProductManager from '../components/shop/MyShopProductManager';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { Button, Card, StyledModal } from '../components/common';
import { useGetShopByIdQuery } from '../redux/services/shopApi';
import { useUpdateDefaultShopMutation } from '../redux/services/myProfileApi';

const ShopPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const MyShopProductControlsFlexWrapper = styled.div`
  display: flex;
`;

const AddProductButtonContainer = styled.div``;

const AddProductButton = styled(Button)``;

const MyShopProductControls = ({ currentShop }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userState.user);
  const [isUpdateDefaultShopModalOpen, setIsUpdateDefaultShopModalOpen] =
    useState(false);
  const [updateDefaultShop, { isLoading, isSuccess }] =
    useUpdateDefaultShopMutation();

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

  return (
    <Card>
      <MyShopProductControlsFlexWrapper>
        <AddProductButtonContainer>
          <AddProductButton onClick={navigateToProductForm} large>
            Add New Product
          </AddProductButton>
        </AddProductButtonContainer>
        {currentUser && currentUser.defaultShop._id !== shopId && (
          <AddProductButtonContainer>
            <Button large onClick={openUpdateDefaultShopModal}>
              Set as default shop
            </Button>
          </AddProductButtonContainer>
        )}
      </MyShopProductControlsFlexWrapper>
      {isUpdateDefaultShopModalOpen && (
        <StyledModal
          showModal={openUpdateDefaultShopModal}
          closeModal={closeUpdateDefaultShopModal}
          isLoading={isLoading}
          onClick={defaultShopOnClickHandler}
        >
          Are you sure you want to set your default shop to {name}?
        </StyledModal>
      )}
    </Card>
  );
};

const MyShopPage = () => {
  const { currentShop, userShops } = useSelector((state) => state.shopState);

  const {
    data: shop,
    isLoading,
    refetch,
  } = useGetShopByIdQuery(currentShop && currentShop._id);

  useEffect(() => {
    refetch();
  }, [currentShop]);

  if (!currentShop || isLoading) return <h3>Loading...</h3>;

  return (
    <ShopPageContainer>
      <ShopHeader shop={shop} />
      <MyShopProductControls currentShop={shop} />
      <MyShopProductManager shopId={shop.id} />
    </ShopPageContainer>
  );
};

export default MyShopPage;
