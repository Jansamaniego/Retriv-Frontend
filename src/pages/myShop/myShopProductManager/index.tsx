import React from 'react';
import styled from 'styled-components';

import { useGetProductsByShopIdQuery } from 'redux/services/productApi/productApi';
import { Card } from 'components/common';
import MyShopProductList from 'pages/myShop/myShopProductManager/myShopProductList';

interface IMyShopProductManagerProps {
  shopId: string;
}

const ShopProductManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, minmax(20.8rem, 0.25fr));
  gap: 2rem;

  @media (max-width: 1650px) {
    grid-template-columns: repeat(5, minmax(20.8rem, 1fr));
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, minmax(20.8rem, 1fr));
  }
  @media (max-width: 830px) {
    grid-template-columns: repeat(2, minmax(20.8rem, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(20.8rem, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(20.8rem, 1fr));
  }

  @media (max-width: 470px) {
    grid-template-columns: repeat(1, minmax(20.8rem, 1fr));
  }
`;

const MyShopProductManager: React.FC<IMyShopProductManagerProps> = ({
  shopId,
}) => {
  const { data: products, isLoading } = useGetProductsByShopIdQuery(shopId);

  if (isLoading)
    return (
      <Card>
        <h1>Loading...</h1>
      </Card>
    );

  if (!products || products.length === 0)
    return (
      <Card>
        <h1>No products found.</h1>
      </Card>
    );

  return (
    <>
      <ShopProductManagerGrid>
        <MyShopProductList products={products} />
      </ShopProductManagerGrid>
    </>
  );
};

export default MyShopProductManager;
