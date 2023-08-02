import React from 'react';
import { useGetProductsByShopIdQuery } from '../../redux/services/productApi';
import styled from 'styled-components';
import ShopProductsList from './ShopProductsList';
import { Button, Card } from '../common';
import { useNavigate } from 'react-router-dom';

const ShopProductManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const MyShopProductManager = ({ shopId }) => {
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
        <ShopProductsList products={products} />
      </ShopProductManagerGrid>
    </>
  );
};

export default MyShopProductManager;
