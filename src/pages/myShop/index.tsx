import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from 'redux/store';
import { useGetShopByIdQuery } from 'redux/services/shopApi/shopApi';
import MyShopProductManager from 'pages/myShop/myShopProductManager';
import MyShopProductControl from 'pages/myShop/myShopProductControl';
import MyShopHeader from 'pages/myShop/myShopHeader';
import { Loading } from 'components/common';

const ShopPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const MyShop = () => {
  const { currentShop } = useSelector((state: RootState) => state.shopState);

  const {
    data: shop,
    isLoading,
    refetch,
  } = useGetShopByIdQuery(currentShop!._id);

  useEffect(() => {
    refetch();
  }, [currentShop]);

  if (isLoading) return <Loading />;

  if (!currentShop || !shop) return <h3>Shop is not found</h3>;

  return (
    <ShopPageContainer>
      <MyShopHeader shop={shop} />
      <MyShopProductControl currentShop={shop} />
      <MyShopProductManager shopId={shop.id} />
    </ShopPageContainer>
  );
};
