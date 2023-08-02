import React from 'react';
import { useSelector } from 'react-redux';
import ShopHeader from '../components/shop/ShopHeader';
import ShopProducts from '../components/shop/ShopProducts';
import styled from 'styled-components';
import { useGetShopRatingsQuery } from '../redux/services/ratings/shopRatingsApi';
import MyShopProductManager from '../components/shop/MyShopProductManager';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/common';

const ShopPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AddProductButtonContainer = styled.div``;

const AddProductButton = styled(Button)``;

const MyShopProductControls = ({ shopId }) => {
  const navigate = useNavigate();
  const navigateToProductForm = () => {
    navigate('/add-product');
  };
  return (
    <Card>
      <AddProductButtonContainer>
        <AddProductButton onClick={navigateToProductForm}>
          Add New Product
        </AddProductButton>
      </AddProductButtonContainer>
    </Card>
  );
};

const MyShopPage = () => {
  const { currentShop, userShops } = useSelector((state) => state.shopState);

  if (!currentShop) return <h3>Loading...</h3>;

  return (
    <ShopPageContainer>
      <ShopHeader shop={currentShop} />
      <MyShopProductControls shopId={currentShop.id} />
      <MyShopProductManager shopId={currentShop.id} />
    </ShopPageContainer>
  );
};

export default MyShopPage;
