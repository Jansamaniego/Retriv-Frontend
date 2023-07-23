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
      transformResponse: (response) => response.reviews,
      providesTags: (result, error, { productId }) => {
        console.log(result);
        return result.results
          ? [
              ...result.results.map(({ id }) => ({ type: 'Review', id })),
              { type: 'Review', id: productId },
            ]
          : [];
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
      invalidatesTags: [{ type: 'Review', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetReviewsByProductIdQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
} = reviewApi;
