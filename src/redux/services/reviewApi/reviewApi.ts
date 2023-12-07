import { createApi } from '@reduxjs/toolkit/query/react';

import customBaseQuery from 'utils/customBaseQuery';
import { IReview } from 'types';
import {
  IGetReviewsByProductIdResponse,
  IGetReviewsByProductId,
  IGetReviewByIdResponse,
  ICreateReview,
  ICreateReviewResponse,
  IUpdateReview,
  IUpdateReviewResponse,
  IDeleteReview,
  IDeleteReviewResponse,
  IReviewWithUserPickValues,
  IGetReviewsByProductIdTransformedResponse,
} from 'redux/services/reviewApi/reviewApi.types';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    getReviewsByProductId: builder.query<
      IGetReviewsByProductIdTransformedResponse,
      IGetReviewsByProductId
    >({
      query({ shopId, productId }) {
        return { url: `shop/${shopId}/product/${productId}/review` };
      },
      transformResponse: (response: IGetReviewsByProductIdResponse) => {
        return response?.reviews;
      },
      providesTags: (results, error, { productId }) => {
        return results?.results
          ? [
              ...results?.results?.map(({ id }) => {
                return { type: 'Review' as const, id };
              }),
              { type: 'Review', id: productId },
            ]
          : [{ type: 'Review', id: productId }];
      },
    }),
    getReviewById: builder.query<IReviewWithUserPickValues, string>({
      query(reviewId) {
        return {
          url: `review/${reviewId}`,
        };
      },
      transformResponse: (response: IGetReviewByIdResponse) => response.review,
      providesTags: (result, error, reviewId) => {
        return result ? [{ type: 'Review' as const, id: reviewId }] : [];
      },
    }),
    createReview: builder.mutation<IReview, ICreateReview>({
      query({ shopId, productId, ...data }) {
        return {
          url: `shop/${shopId}/product/${productId}/review`,
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (response: ICreateReviewResponse) => response.review,
      invalidatesTags: (result, error, { productId }) => {
        return [{ type: 'Review' as const, id: productId }];
      },
    }),
    updateReview: builder.mutation<IUpdateReviewResponse, IUpdateReview>({
      query({ productId, reviewId, ...body }) {
        return {
          url: `product/${productId}/review/${reviewId}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { reviewId }) => [
        { type: 'Review', id: reviewId },
      ],
    }),
    deleteReview: builder.mutation<IDeleteReviewResponse, IDeleteReview>({
      query({ shopId, productId, reviewId }) {
        return {
          url: `shop/${shopId}/product/${productId}/review/${reviewId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { productId, reviewId }) => {
        return [
          { type: 'Review', id: productId },
          { type: 'Review', id: reviewId },
        ];
      },
    }),
  }),
});

export const {
  useGetReviewsByProductIdQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
