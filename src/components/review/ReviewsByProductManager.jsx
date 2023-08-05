import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Card } from '../common';
import {
  useGetReviewsByProductIdQuery,
  useGetReviewByIdQuery,
  useDeleteReviewMutation,
} from '../../redux/services/reviewApi';
import { EditIcon, StarGradientIcon, XMarkIcon } from '../../assets/icons';
import ProfileImageLogo from '../profile/ProfileImageLogo';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyledCard = styled(Card)``;

const ReviewContainer = styled.main`
  position: relative;
  display: flex;
  gap: 1.6rem;
  align-items: flex-start;
`;

const XMarkIconButton = styled.button`
  position: absolute;
  right: 0.8rem;
  top: 0.4rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.2rem;
  border: ${(props) =>
    props.disabled
      ? `1px solid ${props.theme.neutral.light}`
      : `1px solid ${props.theme.neutral[0]}`};
  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};

  &:hover {
    border: ${(props) =>
      props.disabled
        ? `1px solid ${props.theme.neutral.light}`
        : `1px solid ${props.theme.neutral[200]}`};
  }
`;

const EditIconButton = styled.button`
  position: absolute;
  left: 22.5rem;
  top: 0.5rem;
  background-color: ${(props) => props.theme.neutral[700]};
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  color: ${(props) =>
    props.disabled ? props.theme.neutral.light : props.theme.neutral.text};
  border: ${(props) =>
    props.disabled
      ? `1px solid ${props.theme.neutral.light}`
      : `1px solid ${props.theme.neutral[0]}`};
  padding: 0.2rem;
  font: inherit;
  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};
  outline: inherit;

  &:hover {
    border: ${(props) =>
      props.disabled
        ? `1px solid ${props.theme.neutral.light}`
        : `1px solid ${props.theme.neutral[200]}`};
  }
`;

const StyledXMarkIcon = styled(XMarkIcon)`
  color: ${(props) =>
    props.disabled ? props.theme.neutral.light : props.theme.neutral[0]};

  &:hover {
    color: ${(props) =>
      props.disabled ? props.theme.neutral.light : props.theme.neutral[200]};
  }
`;

const StyledEditIcon = styled(EditIcon)`
  color: ${(props) =>
    props.disabled ? props.theme.neutral.light : props.theme.neutral[0]};

  &:hover {
    color: ${(props) =>
      props.disabled ? props.theme.neutral.light : props.theme.neutral[200]};
  }
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

const ReviewText = styled.h5`
  font-weight: 400;
`;

const ReviewCard = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

const ReviewsByProductItem = ({ reviewId }) => {
  const { shopId, productId } = useParams();
  const currentUser = useSelector((state) => state.userState.user);
  const [isEditReviewMode, setIsEditReviewMode] = useState(false);
  const { data: review, isLoading } = useGetReviewByIdQuery(reviewId);
  const [deleteReview, { isLoading: deleteReviewIsLoading }] =
    useDeleteReviewMutation();
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

  const deleteReviewOnClickHandler = () => {
    deleteReview({ shopId, productId, reviewId });
  };

  return (
    <ReviewCard>
      <ReviewContainer>
        <ProfileImageLogo
          profileImage={profileImage}
          imageWidth="10rem"
          onClick={navigateToReviewer}
        />
        <ReviewData>
          <ReviewNameAndStarsContainer>
            <ReviewerName>{name}</ReviewerName>
            <ProductInfoStatsAvgRatingStars>
              {[...Array(5)].map((star, idx) => (
                <StarGradientIcon
                  width="2rem"
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
          {currentUser && currentUser?.id === userId && (
            <XMarkIconButton
              onClick={deleteReviewOnClickHandler}
              disabled={deleteReviewIsLoading}
            >
              <StyledXMarkIcon width="2rem" />
            </XMarkIconButton>
          )}
        </ReviewData>
        {currentUser && currentUser?.id === userId && (
          <EditIconButton
            onClick={deleteReviewOnClickHandler}
            disabled={deleteReviewIsLoading}
          >
            <StyledEditIcon width="2rem" />
          </EditIconButton>
        )}
      </ReviewContainer>
    </ReviewCard>
  );
};

const ReviewsByProductList = ({ reviews }) => {
  return reviews.map(({ _id }) => (
    <ReviewsByProductItem reviewId={_id} key={_id} />
  ));
};

const ReviewsByProductManager = ({
  shopId,
  productId,
  currentUser,
  setIsUserReviewExists,
}) => {
  const { reviews, totalPages, isLoading } = useGetReviewsByProductIdQuery(
    {
      shopId,
      productId,
    },
    {
      selectFromResult: ({ data }) => {
        return {
          reviews: data?.results,
          totalPages: data?.totalPages,
        };
      },
    }
  );

  useEffect(() => {
    const reviewExists =
      reviews && reviews.find((review) => review.user.id === currentUser.id);

    setIsUserReviewExists(!!reviewExists);
  }, [currentUser.id, reviews, setIsUserReviewExists]);

  if (isLoading)
    return (
      <StyledCard>
        <h1>Loading...</h1>
      </StyledCard>
    );

  if (!reviews || reviews.length === 0) {
    return (
      <StyledCard>
        <h4>There are no reviews for this product</h4>
      </StyledCard>
    );
  }

  return <ReviewsByProductList reviews={reviews} />;
};

export default ReviewsByProductManager;
