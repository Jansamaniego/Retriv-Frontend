import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../../utils/customBaseQuery';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query() {
        return {
          url: `/category`,
        };
      },
      transformResponse: (response) => response.categories,
      providesTags: (results) => {
        return results.categories
          ? [
              ...results.categories.map(({ id }) => ({ type: 'Category', id })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }];
      },
    }),
    getCategory: builder.query({
      query(categoryId) {
        return {
          url: `/category/${categoryId}`,
        };
      },
      transformResponse: (response) => response.category,
      providesTags: (result, error, categoryId) => {
        return result ? [{ type: 'Category', id: categoryId }] : [];
      },
    }),
    createCategory: builder.mutation({
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
    updateCategoryDetails: builder.mutation({
      query({ categoryId, body }) {
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
    updateCategoryImage: builder.mutation({
      query({ categoryId, body }) {
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
    deleteCategory: builder.mutation({
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
