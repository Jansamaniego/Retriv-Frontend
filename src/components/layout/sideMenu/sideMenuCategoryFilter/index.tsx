import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { useGetCategoriesQuery } from 'redux/services/categoryApi/categoryApi';
import { useProductPagination } from 'context/ProductPaginationContext';
import { Loading } from 'components/common';

const SideMenuCategoryFilterContainer = styled.div`
  padding-top: 1.6rem;
  padding-left: 0.8rem;
  border-top: 1px solid ${(props) => props.theme.neutral[100]};
  display: block;

  @media (max-width: 1300px) {
    display: none;
  }
`;

const SideMenuCategoryFilterFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryFilterTitle = styled.h5`
  font-weight: 400;

  color: ${(props) => props.theme.primary.main};
`;

const CategoryFilterList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const CategoryFilter = styled.li``;

const CategoriesFilterTitleContainer = styled.div``;

const CategoriesFilterTitle = styled.h5`
  color: ${(props) => props.theme.primary.main};
  margin-bottom: 0.5rem;
  font-weight: 400;
  white-space: nowrap;
`;

const CategoryCheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
`;

const CategoryCheckBox = styled.input.attrs({ type: 'checkbox' })`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;

const CategoryLabel = styled.label`
  cursor: pointer;
`;

const SideMenuCategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setCurrentPage } = useProductPagination();
  const selectedCategories = searchParams.get('categories')?.split(',');

  const { categories, isLoading: categoriesIsLoading } = useGetCategoriesQuery(
    null,
    {
      selectFromResult: ({ data, isLoading }) => {
        return {
          categories: data?.results,
          totalPages: data?.totalPages,
          isLoading: isLoading,
        };
      },
    }
  );

  const handleCheckboxChange: (categoryId: string) => void = (categoryId) => {
    setSearchParams((prevParams) => {
      let values = prevParams.get('categories')?.split(',');

      if (values) {
        // existing values, add/remove specific values
        if (values.includes(categoryId)) {
          // remove value from array
          values = values.filter((currentValue) => currentValue !== categoryId);
        } else {
          // append value to array
          values.push(categoryId);
        }

        if (!!values.length) {
          // set new key-value if values is still populated
          //@ts-ignore
          prevParams.set('categories', values);
        } else {
          // delete key if values array is empty
          prevParams.delete('categories');
        }
      } else {
        // no values for key, create new array with value
        //@ts-ignore
        prevParams.set('categories', [categoryId]);
      }

      return prevParams;
    });
    setCurrentPage(1);
  };

  if (categoriesIsLoading) return <Loading />;

  if (!categories) return <h3>No categories found</h3>;

  return (
    <SideMenuCategoryFilterContainer>
      <SideMenuCategoryFilterFlexWrapper>
        <CategoryFilterTitle>Categories</CategoryFilterTitle>
        <CategoryFilterList>
          {categories.map((category) => (
            <CategoryFilter key={category._id}>
              <CategoryLabel>
                <CategoryCheckBoxContainer>
                  <CategoryCheckBox
                    type="checkbox"
                    checked={
                      selectedCategories &&
                      selectedCategories.includes(category._id)
                    }
                    onChange={() => handleCheckboxChange(category._id)}
                  />
                  <CategoriesFilterTitleContainer>
                    <CategoriesFilterTitle>
                      {category.name}
                    </CategoriesFilterTitle>
                  </CategoriesFilterTitleContainer>
                </CategoryCheckBoxContainer>
              </CategoryLabel>
            </CategoryFilter>
          ))}
        </CategoryFilterList>
      </SideMenuCategoryFilterFlexWrapper>
    </SideMenuCategoryFilterContainer>
  );
};

export default SideMenuCategoryFilter;
