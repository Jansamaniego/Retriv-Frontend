import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query() {
        return { url: '/product' };
      },
      transformResponse: (response) => response.products,
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: 'Product', id })),
              { type: 'Product', id: 'LIST' },
            ]
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
