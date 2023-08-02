import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    getReviewsByProductId: builder.query({
      query({ shopId, productId }) {
        return { url: `shop/${shopId}/product/${productId}/review` };
      },
      transformResponse: (response) => {
        return response?.reviews;
      },
      providesTags: (result, error, { productId }) => {
        return result?.results
          ? [
              ...result.results.map(({ id }) => ({ type: 'Review', id })),
              { type: 'Review', id: productId },
            ]
          : [{ type: 'Review', id: productId }];
      },
    }),
    getReviewById: builder.query({
      query(reviewId) {
        return {
          url: `review/${reviewId}`,
        };
      },
      transformResponse: (response) => response.review,
      providesTags: (result) =>
        result ? [{ type: 'Review', id: result.id }] : [],
    }),
    createReview: builder.mutation({
      query({ shopId, productId, ...data }) {
        return {
          url: `shop/${shopId}/product/${productId}/review`,
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
      transformResponse: (response) => response.review,
      invalidatesTags: (result, error, { productId }) => {
        return [{ type: 'Review', id: productId }];
      },
    }),
    updateReview: builder.mutation({
      query({ productId, reviewId, body }) {
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
    deleteReview: builder.mutation({
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
