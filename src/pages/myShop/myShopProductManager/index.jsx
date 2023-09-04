import React from 'react';
import { useGetProductsByShopIdQuery } from '../../../redux/services/productApi';
import styled from 'styled-components';
import MyShopProductList from './myShopProductList';
import { Button, Card } from '../../../components/common';
import { useNavigate } from 'react-router-dom';

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
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(20.8rem, 1fr));
  }
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
        <MyShopProductList products={products} />
      </ShopProductManagerGrid>
    </>
  );
};

export default MyShopProductManager;
