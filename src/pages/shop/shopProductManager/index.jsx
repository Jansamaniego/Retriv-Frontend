import React from 'react';
import ShopProductList from './shopProductList';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetProductsByShopIdQuery } from '../../../redux/services/productApi/productApi';
import { Loading } from '../../../components/common';

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

const ShopProductManager = () => {
  const { shopId } = useParams();
  const { data: products, isLoading } = useGetProductsByShopIdQuery(shopId);

  if (isLoading) return <Loading />;

  return (
    <ShopProductManagerGrid>
      <ShopProductList products={products} />
    </ShopProductManagerGrid>
  );
};

export default ShopProductManager;
