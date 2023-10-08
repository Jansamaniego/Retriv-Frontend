import React from 'react';
import { useGetShopByIdQuery } from '../../redux/services/shopApi/shopApi';
import ShopHeader from './shopHeader';
import { useParams } from 'react-router-dom';
import { useGetShopRatingsQuery } from '../../redux/services/ratings/shopRatingsApi/shopRatingsApi';
import styled from 'styled-components';
import ShopProductManager from './shopProductManager';
import { Loading } from '../../components/common';

const ShopContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const Shop = () => {
  const { shopId = '' } = useParams();
  const { data: shop, isLoading: isgetShopQueryLoading } =
    useGetShopByIdQuery(shopId);
  const { data: ratings, isLoading: isGetShopRatingsLoading } =
    useGetShopRatingsQuery(shopId);

  if (isgetShopQueryLoading || isGetShopRatingsLoading) {
    return <Loading />;
  }

  if (!shop) return <h3>Shop is not found</h3>;

  if (!ratings) return <h3>Shop rating is not found</h3>;

  return (
    <ShopContainer>
      <ShopHeader shop={shop} shopRatings={ratings} />
      <ShopProductManager />
    </ShopContainer>
  );
};
