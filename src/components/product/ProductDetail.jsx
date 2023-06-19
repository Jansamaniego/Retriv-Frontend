import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/services/productApi';
import { useGetProductRatingsQuery } from '../../redux/services/ratings/productRatingsApi';
import ProductHeader from './ProductHeader';
import ProductShop from './ProductShop';
import ReviewsByProductManager from '../review/ReviewsByProductManager';

const ProductDetailContainer = styled.main``;

const ProductDetail = () => {
  const { shopId, productId } = useParams();

  const { data: product, isLoading: productIsLoading } = useGetProductByIdQuery(
    {
      shopId,
      productId,
    }
  );

  const { data: productRatings, isLoading: productRatingsIsLoading } =
    useGetProductRatingsQuery(
      {
        shopId,
        productId,
      },
      { pollingInterval: 20 * 60 * 1000 }
    );

  if (productIsLoading || productRatingsIsLoading) return <h1>Loading...</h1>;

  return (
    <ProductDetailContainer>
      <ProductHeader productRatings={productRatings} product={product} />
      <ProductShop shopId={product.shop} />
      <ReviewsByProductManager />
    </ProductDetailContainer>
  );
};

export default ProductDetail;
