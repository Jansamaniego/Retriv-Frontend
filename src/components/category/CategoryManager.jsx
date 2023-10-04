import React from 'react';
import {
  categoryApi,
  useGetCategoriesQuery,
} from '../../redux/services/categoryApi/categoryApi';
import styled from 'styled-components';
import CategoryList from './CategoryList';
import { useLoaderData } from 'react-router-dom';

const CategoryManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const CategoryManager = () => {
  const { categories, totalPages, isLoading } = useGetCategoriesQuery(null, {
    selectFromResult: ({ data }) => {
      return {
        categories: data?.results,
        totalPages: data?.totalPages,
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
