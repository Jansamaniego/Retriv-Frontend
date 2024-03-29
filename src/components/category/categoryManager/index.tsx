import styled from 'styled-components';

import { useGetCategoriesQuery } from 'redux/services/categoryApi/categoryApi';
import CategoryList from './categoryList';
import { Loading } from 'components/common';

const CategoryManagerGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  column-gap: 1.6rem;
  row-gap: 1.6rem;
`;

const CategoryManagerText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

const CategoryManager = () => {
  const { categories, isLoading } = useGetCategoriesQuery(null, {
    selectFromResult: ({ data, isLoading }) => {
      return {
        categories: data?.results,
        totalPages: data?.totalPages,
        isLoading: isLoading,
      };
    },
  });

  if (isLoading) return <Loading />;

  if (!categories || categories.length === 0)
    return <CategoryManagerText>No categories found.</CategoryManagerText>;

  return (
    <CategoryManagerGrid>
      <CategoryList categories={categories} />
    </CategoryManagerGrid>
  );
};

export default CategoryManager;
