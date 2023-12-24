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
    <Card>
      <FormProvider {...methods}>
        <ContentFlexWrapper>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h6>
                {rating
                  ? `Your rating is ${rating}`
                  : 'Please rate our product'}
              </h6>
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
                        gradient={currentRating <= (hover || rating) ? 10 : 0}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </ProductInfoStatsStarsRating>
            </div>
            <div>
              <h6>Please leave a comment about the product:</h6>
              <StyledTextarea name="reviewText" placeholder='review' />
            </div>
            <Button type="submit" disabled={isLoading} large>
              Submit Review
            </Button>
          </StyledForm>
          <DevTool control={control} />
        </ContentFlexWrapper>
      </FormProvider>
    </Card>
  );
};

export default ReviewForm;
