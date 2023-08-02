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
          : [{ type: 'Product', id: 'LIST' }];
      },
    }),
    getProductsByShopId: builder.query({
      query(shopId) {
        return {
          url: `shop/${shopId}/product/all`,
        };
      },
      transformResponse: (response) => {
        return response.products;
      },
      providesTags: (result, error, shopId) => [
        { type: 'Product', id: shopId },
      ],
    }),
    getProductById: builder.query({
      query({ shopId, productId }) {
        return {
          url: `/shop/${shopId}/product/${productId}`,
        };
      },
      transformResponse: (response) => response.product,
      providesTags: (result, error, { productId }) =>
        result ? [{ type: 'Product', id: productId }] : [],
    }),
    createProduct: builder.mutation({
      query(arg) {
        const { shopId, formData } = arg;
        return {
          url: `shop/${shopId}/product`,
          method: 'POST',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { shopId }) => [
        ({ type: 'Product', id: 'LIST' }, { type: 'Product', id: shopId }),
      ],
    }),
    updateProductDetails: builder.mutation({
      query({ productId, body }) {
        return {
          url: `/product/${productId}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: productId },
      ],
    }),
    updateProductMainImage: builder.mutation({
      query({ productId, body }) {
        return {
          url: `/product/${productId}/main-image`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: productId },
      ],
    }),
    updateProductImages: builder.mutation({
      query({ productId, body }) {
        return {
          url: `/product/${productId}/images`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: productId },
      ],
    }),
    deleteProduct: builder.mutation({
      query({ shopId, productId }) {
        return {
          url: `/shop/${shopId}/product/${productId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { productId, shopId }) => [
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id: productId },
        { type: 'Product', id: shopId },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByShopIdQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductDetailsMutation,
  useUpdateProductMainImageMutation,
  useUpdateProductImagesMutation,
  useDeleteProductMutation,
} = productApi;
