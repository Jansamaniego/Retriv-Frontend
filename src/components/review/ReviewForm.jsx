import React, { useState } from 'react';
import styled from 'styled-components';
import { useCreateReviewMutation } from '../../redux/services/reviewApi';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';
import { Button, Card, StyledTextarea } from '../common';
import { Form } from 'react-router-dom';
import { StarGradientIcon } from '../../assets/icons';

const ProductInfoStatsStarsRating = styled.div`
  display: flex;
  gap: 1.6rem;
  border-right: 1px solid ${(props) => props.theme.neutral[100]};
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

const ReviewForm = ({ shopId, productId }) => {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [hover, setHover] = useState(0);

  const reviewSchema = z.object({
    reviewText: z.string().min(3).max(100),
    rating: z.enum(['1', '2', '3', '4', '5']),
  });

  const methods = useForm({ resolver: zodResolver(reviewSchema) });

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h6>
              {rating ? `Your rating is ${rating}` : 'Please rate our product'}
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
            <StyledTextarea {...register('reviewText')} />
          </div>
          {errors['reviewText']?.message && (
            <p>{errors['reviewText']?.message}</p>
          )}
          <Button type="submit" disabled={isLoading}>
            Submit Review
          </Button>
        </form>
        <DevTool control={control} />
      </FormProvider>
    </Card>
  );
};

export default ReviewForm;
