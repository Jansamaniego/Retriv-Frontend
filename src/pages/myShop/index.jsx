import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyShopHeader from './myShopHeader';
import styled from 'styled-components';
import MyShopProductManager from './myShopProductManager';
import { useGetShopByIdQuery } from '../../redux/services/shopApi';
import MyShopProductControl from './myShopProductControl';

const ShopPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const MyShop = () => {
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
      <MyShopHeader shop={shop} />
      <MyShopProductControl currentShop={shop} />
      <MyShopProductManager shopId={shop.id} />
    </ShopPageContainer>
  );
};
