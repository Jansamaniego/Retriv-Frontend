import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/services/productApi/productApi';
import { useGetProductRatingsQuery } from '../../redux/services/ratings/productRatingsApi/productRatingsApi';
import ProductHeader from './productHeader';
import ProductShop from './productShop';
import ReviewByProductManager from './reviewByProductManager';
import ReviewForm from './reviewForm';
import { useSelector } from 'react-redux';
import { Loading, PageFlexColumnWrapper } from '../../components/common';

export const Product = () => {
  const { shopId, productId } = useParams();
  const currentUser = useSelector((state) => state.userState.user);
  const { currentShop, userShops } = useSelector((state) => state.shopState);
  const [isUserReviewExists, setIsUserReviewExists] = useState(false);
  const [isOwner, setIsOwner] = useState(
    currentShop ? currentShop.id === shopId : false
  );

  useEffect(() => {
    setIsOwner(currentShop ? currentShop.id === shopId : false);
  }, [currentShop, shopId]);

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

  if (productIsLoading || productRatingsIsLoading) return <Loading />;

  if (!productRatings) {
    productRatings = {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    };
  }

  const { shop } = product;

  return (
    <PageFlexColumnWrapper>
      <ProductHeader
        productRatings={productRatings}
        product={product}
        isOwner={isOwner}
        shopId={shopId}
      />
      <ProductShop shopId={shop} />
      <ReviewByProductManager
        shopId={shopId}
        productId={productId}
        currentUser={currentUser}
        setIsUserReviewExists={setIsUserReviewExists}
      />
      {currentUser && !isOwner && !isUserReviewExists && (
        <ReviewForm shopId={product.shop} productId={productId} />
      )}
    </PageFlexColumnWrapper>
  );
};
