import React from 'react';
import { useGetShopByIdQuery } from '../redux/services/shopApi';
import ShopHeader from '../components/shop/ShopHeader';
import { useParams } from 'react-router-dom';
import { useGetShopRatingsQuery } from '../redux/services/ratings/shopRatingsApi';

const ShopPage = () => {
  const { shopId } = useParams();
  const { data: shop, isLoading: isgetShopQueryLoading } =
    useGetShopByIdQuery(shopId);
  const { data: ratings, isLoading: isGetShopRatingsLoading } =
    useGetShopRatingsQuery(shopId);

  if (isgetShopQueryLoading || isGetShopRatingsLoading) {
    return <h1>Loading...</h1>;
  }

  return <ShopHeader shop={shop} shopRatings={ratings} />;
};

export default ShopPage;
