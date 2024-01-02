import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { IUser } from 'types';
import { IReviewWithUserPickValues } from 'redux/services/reviewApi/reviewApi.types';
import {
  useGetReviewsByProductIdQuery,
  useGetReviewByIdQuery,
  useDeleteReviewMutation,
} from 'redux/services/reviewApi/reviewApi';
import {
  Card,
  StyledModal,
  ProfileImageLogo,
  Loading,
  ContentFlexWrapper,
} from 'components/common';
import EditReviewForm from 'pages/product/reviewByProductManager/editReviewForm';
import { EditIconButton } from 'components/common/editIconButton';
import { StarGradientIcon, XMarkIcon } from 'assets/icons';

interface IReviewByProductManagerProps {
  shopId: string;
  productId: string;
  currentUser: IUser | null;
  setIsUserReviewExists: (arg: boolean) => void;
}

interface IReviewByProductListProps {
  reviews: IReviewWithUserPickValues[];
  currentUser: IUser | null;
}

interface IReviewByProductItemProps {
  reviewId: string;
  currentUser: IUser | null;
}

interface IReviewCardProps {
  children: React.ReactNode;
}

const StyledCard = styled(Card)``;

const XMarkIconButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.2rem;
  width: fit-content;
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

const StyledXMarkIcon = styled(XMarkIcon)`
  color: ${(props) =>
    props.disabled ? props.theme.neutral.light : props.theme.neutral[0]};

  &:hover {
    color: ${(props) =>
      props.disabled ? props.theme.neutral.light : props.theme.neutral[200]};
  }
`;

const ReviewMainFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const ReviewMainContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ReviewData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewerName = styled.h5`
  font-weight: 400;
`;

const ProductInfoStatsAvgRatingStars = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewText = styled.h5`
  font-weight: 400;
`;

const ReviewCard: React.FC<IReviewCardProps> = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

const ReviewByProductItem: React.FC<IReviewByProductItemProps> = ({
  reviewId,
  currentUser,
}) => {
  const [isDeleteReviewModalOpen, setIsDeleteReviewModalOpen] = useState(false);
  const { shopId, productId } = useParams();
  const [isEditReviewMode, setIsEditReviewMode] = useState(false);
  const [isReviewer, setIsReviewer] = useState(false);
  const { data: review, isLoading } = useGetReviewByIdQuery(reviewId);
  const [deleteReview, { isLoading: deleteReviewIsLoading }] =
    useDeleteReviewMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser?.id === review?.user._id) {
      setIsReviewer(true);
    } else {
      return;
    }
  }, [currentUser, review]);

  if (isLoading) return <Loading />;

  if (!review) return <h3>Review is not found.</h3>;

  const {
    rating,
    reviewText,
    user: { _id: userId, firstName, lastName, profileImage },
  } = review;

  console.log(review);
  console.log(currentUser);

  const formattedRating = rating * 10;

  const navigateToReviewer = () => {
    navigate(`/user/${userId}`);
  };

  const activateEditReviewMode = () => {
    setIsEditReviewMode(true);
  };

  const deactivateEditReviewMode = () => {
    setIsEditReviewMode(false);
  };

  const closeDeleteReviewModal = () => {
    setIsDeleteReviewModalOpen(false);
  };

  const deleteReviewOnClickHandler = async () => {
    await deleteReview({ shopId: shopId!, productId: productId!, reviewId });
  };

  return (
    <>
      <ReviewCard>
        <ContentFlexWrapper gap="1.6rem" alignItems="flex-start">
          <ProfileImageLogo
            profileImage={profileImage}
            size="10rem"
            onClick={navigateToReviewer}
          />
          <ReviewData>
            <ReviewerName>{`${firstName} ${lastName}`}</ReviewerName>
            {isEditReviewMode ? (
              <EditReviewForm
                deactivateEditReviewMode={deactivateEditReviewMode}
                review={review}
              />
            ) : (
              <ReviewMainFlexWrapper>
                <ReviewMainContainer>
                  <ProductInfoStatsAvgRatingStars>
                    {[...Array(5)].map((star, idx) => (
                      <StarGradientIcon
                        key={idx}
                        width="2rem"
                        gradient={
                          formattedRating - idx * 10 >= 10
                            ? 10
                            : formattedRating - idx * 10
                        }
                      />
                    ))}
                  </ProductInfoStatsAvgRatingStars>
                  {isReviewer && !isEditReviewMode && (
                    <EditIconButton
                      buttonProps={{
                        onClick: activateEditReviewMode,
                        disabled: isEditReviewMode,
                      }}
                      svgProps={{ width: '2rem' }}
                    />
                  )}
                </ReviewMainContainer>
                <ReviewText>{reviewText}</ReviewText>
              </ReviewMainFlexWrapper>
            )}
          </ReviewData>
          {isReviewer && !isEditReviewMode && (
            <XMarkIconButton
              onClick={deleteReviewOnClickHandler}
              disabled={deleteReviewIsLoading}
            >
              <StyledXMarkIcon width="2rem" />
            </XMarkIconButton>
          )}
        </ContentFlexWrapper>
      </ReviewCard>
      {isDeleteReviewModalOpen && (
        <StyledModal
          isModalOpen={isDeleteReviewModalOpen}
          closeModal={closeDeleteReviewModal}
          onClick={deleteReviewOnClickHandler}
          isLoading={deleteReviewIsLoading}
        >
          Are you sure you want to delete this review?
        </StyledModal>
      )}
    </>
  );
};

const ReviewByProductList: React.FC<IReviewByProductListProps> = ({
  reviews,
  currentUser,
}) => {
  return reviews.map(({ _id }) => (
    <ReviewByProductItem reviewId={_id} key={_id} currentUser={currentUser} />
  ));
};

const ReviewByProductManager: React.FC<IReviewByProductManagerProps> = ({
  shopId,
  productId,
  currentUser,
  setIsUserReviewExists,
}) => {
  const { reviews, isLoading } = useGetReviewsByProductIdQuery(
    {
      shopId,
      productId,
    },
    {
      selectFromResult: ({ data, isLoading }) => {
        return {
          reviews: data?.results,
          totalPages: data?.totalPages,
          isLoading,
        };
      },
    }
  );

  useEffect(() => {
    const reviewExists =
      reviews && reviews.find((review) => review.user._id === currentUser?.id);

    setIsUserReviewExists(!!reviewExists);
  }, [currentUser, reviews, setIsUserReviewExists]);

  if (isLoading)
    return (
      <StyledCard>
        <h1>Loading...</h1>
      </StyledCard>
    );

  if (!reviews || reviews.length === 0) {
    return (
      <StyledCard>
        <ContentFlexWrapper>
          <h4>There are no reviews for this product</h4>
        </ContentFlexWrapper>
      </StyledCard>
    );
  }

  return <ReviewByProductList reviews={reviews} currentUser={currentUser} />;
};

export default ReviewByProductManager;
