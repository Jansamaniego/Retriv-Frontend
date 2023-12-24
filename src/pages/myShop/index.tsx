import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from 'redux/store';
import {
  useGetShopByIdQuery,
  useLazyGetShopByIdQuery,
} from 'redux/services/shopApi/shopApi';
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

  const [trigger, { data: shop }] = useLazyGetShopByIdQuery();

  useEffect(() => {
    if (!currentShop) return;
    trigger(currentShop!._id);
  }, [currentShop]);

  if (!currentShop || !shop) return <h3>Shop is not found</h3>;

  return (
    <ShopPageContainer>
      <MyShopHeader shop={shop} />
      <MyShopProductControl currentShop={shop} />
      <MyShopProductManager shopId={shop.id} />
    </ShopPageContainer>
  );
};
