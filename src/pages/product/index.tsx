import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/store';
import { useGetProductByIdQuery } from 'redux/services/productApi/productApi';
import { useGetProductRatingsQuery } from 'redux/services/ratings/productRatingsApi/productRatingsApi';
import { Loading, PageFlexColumnWrapper } from 'components/common';
import ProductHeader from 'pages/product/productHeader';
import ProductShop from 'pages/product/productShop';
import ReviewByProductManager from 'pages/product/reviewByProductManager';
import ReviewForm from 'pages/product/reviewForm';

export const Product = () => {
  const { shopId = '', productId = '' } = useParams();
  const currentUser = useSelector((state: RootState) => state.userState.user);
  const { currentShop } = useSelector((state: RootState) => state.shopState);
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

  if (!product) return null;

  const { shop } = product;

  return (
    <PageFlexColumnWrapper>
      <ProductHeader
        productRatings={
          productRatings || { ratingsAverage: 0, ratingsQuantity: 0 }
        }
        product={product}
        isOwner={isOwner}
        shopId={shopId}
      />
      <ProductShop shopId={typeof shop === 'string' ? shop : shop.id} />
      <ReviewByProductManager
        shopId={shopId}
        productId={productId}
        currentUser={currentUser}
        setIsUserReviewExists={setIsUserReviewExists}
      />
      {currentUser && !isOwner && !isUserReviewExists && (
        <ReviewForm
          shopId={
            typeof product.shop === 'string' ? product.shop : product.shop.id
          }
          productId={productId}
        />
      )}
    </PageFlexColumnWrapper>
  );
};
