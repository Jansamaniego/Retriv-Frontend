import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StarGradientIcon } from '../../../../assets/icons';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useParams } from 'react-router-dom';
import { useUpdateReviewMutation } from '../../../../redux/services/reviewApi';
import { Button, StyledTextarea } from '../../../../components/common';
import { DevTool } from '@hookform/devtools';

const EditReviewFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const EditReviewForm = ({ review, deactivateEditReviewMode }) => {
  const { shopId, productId } = useParams();
  const [updateReview, { isLoading }] = useUpdateReviewMutation();
  const [hover, setHover] = useState(0);

  const reviewSchema = z.object({
    reviewText: z.string().min(3).max(100),
    rating: z.number().max(5),
  });

  const methods = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: review.rating,
      reviewText: review.reviewText,
    },
  });

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    console.log('hit');
    await updateReview({
      reviewId: review._id,
      productId,
      reviewText: data.reviewText,
      rating: data.rating,
    });
    deactivateEditReviewMode();
  };

  const { rating } = watch();

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <EditReviewFormContainer>
          <div>
            <ProductInfoStatsStarsRating>
              {[...Array(5)].map((star, idx) => {
                const currentRating = idx + 1;
                return (
                  <label key={idx}>
                    <StarRadioInput
                      type="number"
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
          <FlexWrapper>
            <StyledTextarea
              placeholder="Please leave a review..."
              {...register('reviewText')}
            />
            {errors['reviewText']?.message && (
              <p>{errors['reviewText']?.message}</p>
            )}
            <Button onClick={deactivateEditReviewMode} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </FlexWrapper>
        </EditReviewFormContainer>
      </Form>
      <DevTool control={control} />
    </FormProvider>
  );
};

export default EditReviewForm;
