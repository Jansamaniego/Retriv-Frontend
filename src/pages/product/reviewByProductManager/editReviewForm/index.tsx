import React, { useState } from 'react';
import styled from 'styled-components';
import { z } from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import { IReviewWithUserPickValues } from 'redux/services/reviewApi/reviewApi.types';
import { useUpdateReviewMutation } from 'redux/services/reviewApi/reviewApi';
import { StarGradientIcon } from 'assets/icons';
import { Button, Form, StyledTextarea } from 'components/common';

interface IEditReviewFormProps {
  review: IReviewWithUserPickValues;
  deactivateEditReviewMode: () => void;
}

interface FormValues {
  reviewText: string;
  rating: number;
}

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

const EditReviewForm: React.FC<IEditReviewFormProps> = ({
  review,
  deactivateEditReviewMode,
}) => {
  const { productId } = useParams();
  const [updateReview, { isLoading }] = useUpdateReviewMutation();
  const [hover, setHover] = useState<number | null>(0);

  const reviewSchema = z.object({
    reviewText: z.string().min(3).max(100),
    rating: z.coerce.number().max(5),
  });

  const methods = useForm<FormValues>({
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    await updateReview({
      reviewId: review._id,
      productId: productId!,
      reviewText: data.reviewText,
      rating: data.rating,
    });
    deactivateEditReviewMode();
  };

  const { rating, reviewText } = watch();

  console.log(rating, 'yegege');
  console.log(reviewText, 'yegege');

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
              name="reviewText"
            />
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
