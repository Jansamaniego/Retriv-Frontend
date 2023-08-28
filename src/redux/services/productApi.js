import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query(queryString) {
        return { url: `/product?${queryString || ''}`, credentials: 'include' };
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
      query({ productId, shopId, body }) {
        return {
          url: `shop/${shopId}/product/${productId}`,
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
      query(formData) {
        return {
          url: `shop/${formData.get('shopId')}/product/${formData.get(
            'productId'
          )}/main-image`,
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, formData) => [
        { type: 'Product', id: formData.get('productId') },
      ],
    }),
    updateProductImages: builder.mutation({
      query(formData) {
        return {
          url: `shop/${formData.get('shopId')}/product/${formData.get(
            'productId'
          )}/images`,
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, formData) => [
        { type: 'Product', id: formData.get('productId') },
      ],
    }),
    addProductImages: builder.mutation({
      query(formData) {
        return {
          url: `shop/${formData.get('shopId')}/product/${formData.get(
            'productId'
          )}/add-images`,
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, formData) => [
        { type: 'Product', id: formData.get('productId') },
      ],
    }),
    deleteProductImage: builder.mutation({
      query({ shopId, productId, ...body }) {
        return {
          url: `shop/${shopId}/product/${productId}/images`,
          method: 'DELETE',
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
  useAddProductImagesMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
} = productApi;
