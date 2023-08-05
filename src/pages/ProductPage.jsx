import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../redux/services/productApi';
import { useGetProductRatingsQuery } from '../redux/services/ratings/productRatingsApi';
import ProductHeader from '../components/product/ProductHeader';
import ProductShop from '../components/product/ProductShop';
import ReviewsByProductManager from '../components/review/ReviewsByProductManager';
import ReviewForm from '../components/review/ReviewForm';
import { useSelector } from 'react-redux';
import { useGetReviewsByProductIdQuery } from '../redux/services/reviewApi';

const ProductDetailContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const ProductPage = () => {
  const { shopId, productId } = useParams();
  const currentUser = useSelector((state) => state.userState.user);
  const { currentShop, userShops } = useSelector((state) => state.shopState);
  const [isUserReviewExists, setIsUserReviewExists] = useState(false);
  const [isOwner, setIsOwner] = useState(
    currentShop ? currentShop.id === shopId : false
  );

  const { data: product, isLoading: productIsLoading } = useGetProductByIdQuery(
    {
      shopId,
      productId,
    }
  );

  let { data: productRatings, isLoading: productRatingsIsLoading } =
    useGetProductRatingsQuery(
      {
        shopId,
        productId,
      },
      { pollingInterval: 20 * 60 * 1000 }
    );

  if (productIsLoading || productRatingsIsLoading) return <h1>Loading...</h1>;

  if (!productRatings) {
    productRatings = {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    };
  }
  console.log(currentUser, isOwner);

  return (
    <ProductDetailContainer>
      <ProductHeader
        productRatings={productRatings}
        product={product}
        isOwner={isOwner}
        shopId={shopId}
      />
      <ProductShop shopId={product.shop} />
      <ReviewsByProductManager
        shopId={shopId}
        productId={productId}
        currentUser={currentUser}
        setIsUserReviewExists={setIsUserReviewExists}
      />
      {currentUser && !isOwner && !isUserReviewExists && (
        <ReviewForm shopId={product.shop} productId={productId} />
      )}
    </ProductDetailContainer>
  );
};

export default ProductPage;
