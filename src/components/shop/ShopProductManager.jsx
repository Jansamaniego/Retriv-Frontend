import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetProductsByShopIdQuery } from '../../redux/services/productApi';
import ShopProductsList from './ShopProductsList';
import { Card } from '../common';

const ShopProductManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const ShopProductManager = () => {
  const { shopId } = useParams();
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
    <ShopProductManagerGrid>
      <ShopProductsList products={products} />
    </ShopProductManagerGrid>
  );
};

export default ShopProductManager;
