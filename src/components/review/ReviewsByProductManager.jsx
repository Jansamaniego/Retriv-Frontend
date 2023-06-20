import React from 'react';
import styled from 'styled-components';
import { Card } from '../common';
import {
  useGetReviewsByProductIdQuery,
  useGetReviewByIdQuery,
} from '../../redux/services/reviewApi';

const StyledCard = styled(Card)``;

const ReviewCard = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

const ReviewsByProductItem = ({ reviewId }) => {
  const { data: review, isLoading } = useGetReviewByIdQuery(reviewId);

  if (isLoading) return <h1>Loading...</h1>;

  console.log(review);

  return <ReviewCard>{review.text}</ReviewCard>;
};

const ReviewsByProductList = ({ reviews }) => {
  if (!reviews)
    return (
      <StyledCard>
        <h4>There are no reviews for this product</h4>
      </StyledCard>
    );

  return reviews.map(({ id }) => <ReviewsByProductItem reviewId={id} />);
};

const ReviewsByProductManager = ({ shopId, productId }) => {
  const { data: reviews, isLoading } = useGetReviewsByProductIdQuery({
    shopId,
    productId,
  });

  if (isLoading) <h1>Loading...</h1>;

  return <ReviewsByProductList reviews={reviews} />;
};

export default ReviewsByProductManager;
