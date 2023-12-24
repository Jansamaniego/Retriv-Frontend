import { createApi } from '@reduxjs/toolkit/query/react';

import customBaseQuery from 'utils/customBaseQuery';
import { IProduct, IResponse } from 'types';
import {
  IGetProductsByShopIdResponse,
  IGetProductsResponse,
  IGetProductById,
  IGetProductByIdResponse,
  ICreateProductResponse,
  ICreateProduct,
  IUpdateProductDetails,
  IUpdateProductDetailsResponse,
  IUpdateProductMainImage,
  IUpdateProductImages,
  IAddProductImages,
  IDeleteProductImage,
  IDeleteProduct,
  IDeleteProductResponse,
  IGetProductsTransformedResponse,
  IGetProductsByShopId,
} from 'redux/services/productApi/productApi.types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<IGetProductsTransformedResponse, string>({
      query(queryString) {
        return { url: `/product?${queryString || ''}`, credentials: 'include' };
      },
      transformResponse: (response: IGetProductsResponse) => {
        return response.products;
      },
      providesTags: (results) => {
        return results?.results
          ? [
              ...results.results.map(({ id }) => ({
                type: 'Product' as const,
                id,
              })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }];
      },
    }),
    getProductsByShopId: builder.query<
      IGetProductsTransformedResponse,
      IGetProductsByShopId
    >({
      query({ shopId, queryString }) {
        return {
          url: `shop/${shopId}/product/all?${queryString || ''}`,
        };
      },
      transformResponse: (response: IGetProductsByShopIdResponse) => {
        console.log(response);
        return response.results;
      },
      providesTags: (result, error, { shopId }) => [
        {
          type: 'Product' as const,
          id: shopId,
        },
      ],
    }),
    getProductById: builder.query<IProduct, IGetProductById>({
      query({ shopId, productId }) {
        return {
          url: `/shop/${shopId}/product/${productId}`,
        };
      },
      transformResponse: (response: IGetProductByIdResponse) =>
        response.product,
      providesTags: (result, error, { productId }) =>
        result ? [{ type: 'Product' as const, id: productId }] : [],
    }),
    createProduct: builder.mutation<ICreateProductResponse, ICreateProduct>({
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
        { type: 'Product' as const, id: 'LIST' },
        { type: 'Product', id: shopId },
      ],
    }),
    updateProductDetails: builder.mutation<
      IUpdateProductDetailsResponse,
      IUpdateProductDetails
    >({
      query(data) {
        const { productId, shopId, ...body } = data;
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
    updateProductMainImage: builder.mutation<
      IResponse,
      IUpdateProductMainImage
    >({
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
      invalidatesTags: (result, error, formData) => {
        const productId = formData.get('productId');
        return typeof productId === 'string'
          ? [{ type: 'Product' as const, id: productId }]
          : [];
      },
    }),
    updateProductImages: builder.mutation<IResponse, IUpdateProductImages>({
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
      invalidatesTags: (result, error, formData) => {
        const productId = formData.get('productId');
        return typeof productId === 'string'
          ? [{ type: 'Product' as const, id: productId }]
          : [];
      },
    }),
    addProductImages: builder.mutation<IResponse, IAddProductImages>({
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
      invalidatesTags: (result, error, formData) => {
        const productId = formData.get('productId');
        return typeof productId === 'string'
          ? [{ type: 'Product' as const, id: productId }]
          : [];
      },
    }),
    deleteProductImage: builder.mutation<IResponse, IDeleteProductImage>({
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
    deleteProduct: builder.mutation<IDeleteProductResponse, IDeleteProduct>({
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
