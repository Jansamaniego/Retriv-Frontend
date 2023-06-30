import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query(queryString) {
        return { url: `/product?${queryString || ''}` };
      },
      transformResponse: (response) => response.products,
      providesTags: (results) => {
        return Array.isArray(results.results)
          ? [
              ...results.results.map(({ id }) => ({ type: 'Product', id })),
              { type: 'Product', id: 'LIST' },
            ]
          : results.results
          ? [{ type: 'Product', id: results[0].id }]
          : [];
      },
    }),
    getProductById: builder.query({
      query({ shopId, productId }) {
        return {
          url: `shop/${shopId}/product/${productId}`,
        };
      },
      transformResponse: (response) => response.product,
      providesTags: (result, error, { productId }) =>
        result ? [{ type: 'Product', id: productId }] : [],
    }),
    createProduct: builder.mutation({
      query(body) {
        return {
          url: '/product',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
} = productApi;
