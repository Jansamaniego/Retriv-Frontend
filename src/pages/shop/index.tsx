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

const ShopText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
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

  if (!shop) return <ShopText>Shop is not found</ShopText>;

  if (!ratings) return <ShopText>Shop rating is not found</ShopText>;

  return (
    <ShopContainer>
      <ShopHeader shop={shop} shopRatings={ratings} />
      <ShopProductManager />
    </ShopContainer>
  );
};
