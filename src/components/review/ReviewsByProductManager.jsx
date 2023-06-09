import React from 'react';
import styled from 'styled-components';
import { Card } from '../common';
import {
  useGetReviewsByProductIdQuery,
  useGetReviewByIdQuery,
} from '../../redux/services/reviewApi';
import { StarGradientIcon } from '../../assets/icons';
import ProfileImageLogo from '../profile/ProfileImageLogo';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)``;

const ReviewContainer = styled.main`
  display: flex;
  gap: 1.6rem;
`;

const ReviewNameAndStarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ReviewData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ReviewerName = styled.h6``;

const ProductInfoStatsAvgRatingStars = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewText = styled.h6`
  font-weight: 300;
`;

const ReviewCard = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

const ReviewsByProductItem = ({ reviewId }) => {
  const { data: review, isLoading } = useGetReviewByIdQuery(reviewId);
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading...</h1>;

  const {
    rating,
    reviewText,
    user: { _id: userId, name, profileImage },
  } = review;

  const formattedRating = rating * 10;

  const navigateToReviewer = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <ReviewCard>
      <ReviewContainer>
        <ProfileImageLogo
          profileImage={profileImage}
          imageWidth="6rem"
          onClick={navigateToReviewer}
        />
        <ReviewData>
          <ReviewNameAndStarsContainer>
            <ReviewerName>{name}</ReviewerName>
            <ProductInfoStatsAvgRatingStars>
              {[...Array(5)].map((star, idx) => (
                <StarGradientIcon
                  width="1rem"
                  gradient={
                    formattedRating - idx * 10 >= 10
                      ? 10
                      : formattedRating - idx * 10
                  }
                />
              ))}
            </ProductInfoStatsAvgRatingStars>
          </ReviewNameAndStarsContainer>
          <ReviewText>{reviewText}</ReviewText>
        </ReviewData>
      </ReviewContainer>
    </ReviewCard>
  );
};

const ReviewsByProductList = ({ reviews }) => {
  return reviews.map(({ _id }) => (
    <ReviewsByProductItem reviewId={_id} key={_id} />
  ));
};

const ReviewsByProductManager = ({ shopId, productId }) => {
  const { data: reviews, isLoading } = useGetReviewsByProductIdQuery({
    shopId,
    productId,
  });

  if (isLoading)
    <StyledCard>
      <h1>Loading...</h1>
    </StyledCard>;

  if (!reviews) {
    return (
      <StyledCard>
        <h4>There are no reviews for this product</h4>
      </StyledCard>
    );
  }
  console.log(reviews);

  return <ReviewsByProductList reviews={reviews} />;
};

export default ReviewsByProductManager;
