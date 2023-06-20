import React from 'react';
import styled from 'styled-components';
import { useCreateReviewMutation } from '../../redux/services/reviewApi';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';

const ReviewForm = ({ shopId, productId }) => {
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const reviewSchema = z.object({
    reviewText: z.string().min(100),
    rating: z.number().min(1).max(5),
  });

  const methods = useForm({ resolver: zodResolver(reviewSchema) });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    createReview({
      shopId,
      productId,
      ...data,
    });
  };

  return <div>ReviewForm</div>;
};

export default ReviewForm;
