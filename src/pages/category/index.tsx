import { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useSearchParams } from 'react-router-dom';

import { useGetCategoryQuery } from 'redux/services/categoryApi/categoryApi';
import { Loading } from 'components/common';
import CategoryDetail from 'pages/category/categoryDetail';
import ProductManager from 'components/product/productManager';
import { useProductPagination } from 'context/ProductPaginationContext';

const CategoryPageFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Category = () => {
  const { categoryId } = useParams();
  const { currentPage, setCurrentPage } = useProductPagination();
  const { data: category, isLoading } = useGetCategoryQuery(categoryId || '');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((params) => {
      params.set('page', '1');
      return params;
    });
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setSearchParams((params) => {
      params.set('page', currentPage.toString());
      return params;
    });
  }, [currentPage]);

  useEffect(() => {
    setSearchParams((params) => {
      params.set('filterBy', 'category');
      params.set('filter', categoryId || '');
      return params;
    });
  }, [categoryId, setSearchParams]);

  if (isLoading) return <Loading />;

  if (!category) return <h3>Category is not found</h3>;

  return (
    <CategoryPageFlexWrapper>
      <CategoryDetail category={category} />
      <ProductManager isProductSearchControlsOpen={false} />
    </CategoryPageFlexWrapper>
  );
};
