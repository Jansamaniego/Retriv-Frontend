import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetProductsByShopIdQuery } from '../../redux/services/productApi';
import ShopProductsList from './ShopProductsList';

const ShopProductManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const ShopProductManager = () => {
  const { shopId } = useParams();
  const { data: products, isLoading } = useGetProductsByShopIdQuery(shopId);

  if (!products || isLoading) return <h1>Loading...</h1>;

  return (
    <ShopProductManagerGrid>
      <ShopProductsList products={products} />
    </ShopProductManagerGrid>
  );
};

export default ShopProductManager;
