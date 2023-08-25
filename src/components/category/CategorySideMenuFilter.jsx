import React, { useState } from 'react';
import styled from 'styled-components';
import { useGetCategoriesQuery } from '../../redux/services/categoryApi';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../redux/services/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../common';
import { useProductPagination } from '../../context/ProductPaginationContext';

const CategorySideMenuFilterContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.neutral[100]};
`;

const CategorySideMenuFilterFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const CategoriesFilterTitleContainer = styled.div`
  padding: 1.6rem 0.8rem;
`;
const CategoriesFilterTitle = styled.h5`
  color: ${(props) => props.theme.primary.main};
  margin-bottom: 0.5rem;
  font-weight: 400;
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
  color: ${(props) => props.theme.primary.main};
  font-size: 2rem;
  cursor: pointer;
`;

const formatQueryParams = (params) => {
  const obj = {};
  for (const [key, value] of params.entries()) {
    if (value !== '') obj[key] = value;
  }
  return obj;
};

const formatData = (data, searchParams) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== '') {
      acc[key] = value;
    } else {
      searchParams.delete(key);
    }
    return acc;
  }, {});
};

const CategorySideMenuFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setCurrentPage } = useProductPagination();
  const selectedCategories = searchParams.get('categories')?.split(',');

  const { categories, isLoading: categoriesIsLoading } = useGetCategoriesQuery(
    null,
    {
      selectFromResult: ({ data }) => {
        return {
          categories: data?.results,
          totalPages: data?.totalPages,
        };
      },
    }
  );

  const handleCheckboxChange = (categoryId) => {
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
          prevParams.set('categories', values);
        } else {
          // delete key if values array is empty
          prevParams.delete('categories');
        }
      } else {
        // no values for key, create new array with value
        prevParams.set('categories', [categoryId]);
      }

      return prevParams;
    });
    setCurrentPage(1);
  };

  if (categoriesIsLoading || !categories) return <Loading />;

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <label>
              <input
                type="checkbox"
                checked={
                  selectedCategories &&
                  selectedCategories.includes(category._id)
                }
                onChange={() => handleCheckboxChange(category._id)}
              />
              {category.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySideMenuFilter;
