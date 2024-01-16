import React, { useState } from 'react';
import styled from 'styled-components';
import { z } from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import { useCreateReviewMutation } from 'redux/services/reviewApi/reviewApi';
import {
  Button,
  Card,
  CardWithFlexWrapper,
  ContentFlexWrapper,
  StyledTextarea,
} from 'components/common';
import { StarGradientIcon } from 'assets/icons';

interface IReviewFormProps {
  shopId: string;
  productId: string;
}

interface FormValues {
  rating: number;
  reviewText: string;
}

const StyledForm = styled.form`
  width: 100%;
`;

const ProductInfoStatsStarsRating = styled.div`
  display: flex;
  gap: 1.6rem;
  align-self: center;
`;

const StarRadioInput = styled.input.attrs({
  type: 'radio',
})`
  display: none;
`;

const StyledStarGradientIcon = styled(StarGradientIcon)`
  cursor: pointer;
`;

const ReviewFormText = styled.h6`
  color: ${(props) => props.theme.neutral.text};
`;

const StyledStyledTextarea = styled(StyledTextarea)`
  width: 100%;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ReviewForm: React.FC<IReviewFormProps> = ({ shopId, productId }) => {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [hover, setHover] = useState<number | null>(0);

  const reviewSchema = z.object({
    reviewText: z.string().min(3).max(100),
    rating: z.enum(['1', '2', '3', '4', '5']),
  });

  const methods = useForm<FormValues>({ resolver: zodResolver(reviewSchema) });

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createReview({
      shopId,
      productId,
      reviewText: data.reviewText,
      rating: Number(data.rating),
    });
  };

  const { rating } = watch();

  return (
    <CardWithFlexWrapper>
      <FormProvider {...methods}>
        <ContentFlexWrapper>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <div>
              <ReviewFormText>
                {rating
                  ? `Your rating is ${rating}`
                  : 'Please rate our product:'}
              </ReviewFormText>
              <ProductInfoStatsStarsRating>
                {[...Array(5)].map((star, idx) => {
                  const currentRating = idx + 1;
                  return (
                    <label key={currentRating}>
                      <StarRadioInput
                        value={currentRating}
                        {...register('rating', { valueAsNumber: true })}
                      />
                      <StyledStarGradientIcon
                        width="3rem"
                        gradient={currentRating <= (hover || rating) ? 20 : 0}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </ProductInfoStatsStarsRating>
            </div>
            <div>
              <ReviewFormText>
                Please leave a comment about the product:
              </ReviewFormText>
              <StyledStyledTextarea name="reviewText" placeholder="review" />
            </div>
            <SubmitButtonContainer>
              <Button type="submit" disabled={isLoading}>
                Submit
              </Button>
            </SubmitButtonContainer>
          </StyledForm>
          <DevTool control={control} />
        </ContentFlexWrapper>
      </FormProvider>
    </CardWithFlexWrapper>
  );
};

export default ReviewForm;
