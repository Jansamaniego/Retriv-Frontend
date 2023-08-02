import React from 'react';
import { useGetShopByIdQuery } from '../redux/services/shopApi';
import ShopHeader from '../components/shop/ShopHeader';
import ShopProducts from '../components/shop/ShopProducts';
import { useParams } from 'react-router-dom';
import { useGetShopRatingsQuery } from '../redux/services/ratings/shopRatingsApi';
import styled from 'styled-components';

const ShopPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const ShopPage = () => {
  const { shopId } = useParams();
  const { data: shop, isLoading: isgetShopQueryLoading } =
    useGetShopByIdQuery(shopId);
  const { data: ratings, isLoading: isGetShopRatingsLoading } =
    useGetShopRatingsQuery(shopId);

  if (isgetShopQueryLoading || isGetShopRatingsLoading) {
    return <h1>Loading...</h1>;
  }


  return (
    <ShopPageContainer>
      <ShopHeader shop={shop} shopRatings={ratings} />
      <ShopProducts />
    </ShopPageContainer>
  );
};

export default ShopPage;
