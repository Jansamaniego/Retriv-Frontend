import React from 'react';
import {
  categoryApi,
  useGetCategoriesQuery,
} from '../../../redux/services/categoryApi/categoryApi';
import styled from 'styled-components';
import CategoryList from './categoryList';
import { useLoaderData } from 'react-router-dom';

const CategoryManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const CategoryManager = () => {
  const { categories, totalPages, isLoading } = useGetCategoriesQuery(null, {
    selectFromResult: ({ data, isLoading }) => {
      return {
        categories: data?.results,
        totalPages: data?.totalPages,
        isLoading: isLoading,
      };
    },
  });

  if (isLoading) return <h3>Loading...</h3>;

  if (!categories || categories.length === 0)
    return <h3>No categories found.</h3>;

  return (
    <CategoryManagerGrid>
      <CategoryList categories={categories} />
    </CategoryManagerGrid>
  );
};

export default CategoryManager;
