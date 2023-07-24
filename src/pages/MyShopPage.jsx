import React from 'react';
import { useSelector } from 'react-redux';
import ShopHeader from '../components/shop/ShopHeader';
import ShopProducts from '../components/shop/ShopProducts';
import styled from 'styled-components';
import { useGetShopRatingsQuery } from '../redux/services/ratings/shopRatingsApi';
import MyShopProductManager from '../components/shop/MyShopProductManager';

const ShopPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const MyShopPage = () => {
  const { currentShop, userShops } = useSelector((state) => state.shopState);
  const { data: ratings, isLoading } = useGetShopRatingsQuery(currentShop.id);

  if (isLoading) return <h3>Loading...</h3>;

  console.log(ratings);

  return (
    <ShopPageContainer>
      <ShopHeader shop={currentShop} shopRatings={ratings} />
      <MyShopProductManager shopId={currentShop._id} />
    </ShopPageContainer>
  );
};

export default MyShopPage;
