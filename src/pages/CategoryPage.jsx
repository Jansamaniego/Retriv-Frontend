import React from 'react';
import CategoryDetail from '../components/category/CategoryDetail';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductManager from './ProductManager';
import styled from 'styled-components';
import { useEffect } from 'react';
import RecommendedProductManager from '../components/product/RecommendedProductManager';
import { useSelector } from 'react-redux';
import { useGetCategoryQuery } from '../redux/services/categoryApi';
import { Loading } from '../components/common';

const CategoryPageFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const formatQueryParams = (params) => {
  const obj = {};
  for (const [key, value] of params.entries()) {
    if (value !== '') obj[key] = value;
  }
  return obj;
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const loggedInUser = useSelector((state) => state.userState.user);
  const { data: category, isLoading } = useGetCategoryQuery(categoryId);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((params) => {
      return {
        ...formatQueryParams(params),
        filterBy: 'category',
        filter: categoryId,
      };
    });
  }, [categoryId, setSearchParams]);

  if (isLoading) return <Loading />;

  return (
    <CategoryPageFlexWrapper>
      <CategoryDetail category={category} />
      <RecommendedProductManager />
    </CategoryPageFlexWrapper>
  );
};

export default CategoryPage;
