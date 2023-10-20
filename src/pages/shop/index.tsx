import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { useGetShopByIdQuery } from 'redux/services/shopApi/shopApi';
import { useGetShopRatingsQuery } from 'redux/services/ratings/shopRatingsApi/shopRatingsApi';
import { Loading } from 'components/common';
import ShopHeader from 'pages/shop/shopHeader';
import ShopProductManager from 'pages/shop/shopProductManager';

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
