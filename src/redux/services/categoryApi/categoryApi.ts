import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../../utils/customBaseQuery';
import { ICategory } from 'src/types';
import {
  ICategoryResponse,
  ICreateCategory,
  IGetCategoriesResponse,
  IGetCategoriesReturnObject,
  IUpdateCategoryDetails,
  IUpdateCategoryImage,
} from './categoryApi.types';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<IGetCategoriesReturnObject, null>({
      query() {
        return {
          url: `/category`,
        };
      },
      transformResponse: (response: IGetCategoriesResponse) =>
        response.categories,
      providesTags: (response) => {
        let categories;
        if (response) {
          categories = response.results;
        }
        return categories
          ? [
              ...categories.map(({ id }) => ({
                type: 'Category' as const,
                id,
              })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }];
      },
    }),
    getCategory: builder.query<ICategory, string>({
      query(categoryId) {
        return {
          url: `/category/${categoryId}`,
        };
      },
      transformResponse: (response: ICategoryResponse) => response.category,
      providesTags: (result, error, categoryId) => {
        return result ? [{ type: 'Category', id: categoryId }] : [];
      },
    }),
    createCategory: builder.mutation<ICategoryResponse, ICreateCategory>({
      query(body) {
        return {
          url: '/category',
          method: 'POST',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: 'Category', id: 'LIST' }] : [],
    }),
    updateCategoryDetails: builder.mutation<
      ICategoryResponse,
      IUpdateCategoryDetails
    >({
      query({ categoryId, ...body }) {
        return {
          url: `/category/${categoryId}`,
          method: 'PATCH',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: (result, error, { categoryId }) =>
        result ? [{ type: 'Category', id: categoryId }] : [],
    }),
    updateCategoryImage: builder.mutation<ICategory, IUpdateCategoryImage>({
      query(formData) {
        return {
          url: `/category/${formData.get('id')}/image`,
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        };
      },
      transformResponse: (response: ICategoryResponse) => response.category,
      invalidatesTags: (result, error, formData) => {
        const id = formData.get('id');
        return typeof id === 'string'
          ? [{ type: 'Category' as const, id }]
          : [];
      },
    }),
    deleteCategory: builder.mutation<ICategoryResponse, string>({
      query(categoryId) {
        return {
          url: `/category/${categoryId}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: 'Category', id: 'LIST' }] : [],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryDetailsMutation,
  useUpdateCategoryImageMutation,
  useDeleteCategoryMutation,
} = categoryApi;
