import React from 'react';
import { Loading, StyledModal } from '../../../../common';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useProductPagination } from '../../../../../context/ProductPaginationContext';
import { useGetCategoriesQuery } from '../../../../../redux/services/categoryApi/categoryApi';
import { useEffect } from 'react';
import { ICategory } from 'src/types';

interface ICategoryFilterModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const CategoryFilterList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  list-style: none;
  padding-left: 0;

  @media (max-width: 360px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CategoryFilter = styled.li``;

const CategoriesFilterTitleContainer = styled.div``;

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

const CategoryLabel = styled.div`
  cursor: pointer;
`;

const CategoryFilterModal: React.FC<ICategoryFilterModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryFilterArray, setCategoryFilterArray] = useState<string[]>([]);
  const { setCurrentPage } = useProductPagination();

  const {
    categories,
    totalPages,
    isLoading: categoriesIsLoading,
  } = useGetCategoriesQuery(null, {
    selectFromResult: ({ data, isLoading }) => {
      return {
        categories: data?.results,
        totalPages: data?.totalPages,
        isLoading: isLoading,
      };
    },
  });

  useEffect(() => {
    const selectedCategories = searchParams.get('categories')?.split(',');
    setCategoryFilterArray(selectedCategories ? selectedCategories : []);
  }, [searchParams]);

  const handleCheckboxOnClickHandler: (
    categoryId: string
  ) => string[] | void = (categoryId) => {
    setCategoryFilterArray((prevValue) => {
      let values = [...prevValue];

      console.log(values);

      if (!!values.length) {
        // existing values, add/remove specific values
        if (values.includes(categoryId)) {
          // remove value from array
          console.log('removeId');
          values = values.filter((currentValue) => currentValue !== categoryId);
        } else {
          // append value to array
          console.log('pushId');
          values.push(categoryId);
        }
      } else {
        // no values for key, create new array with value
        console.log('createArrayWithId');
        values = [categoryId];
      }
      return values;
    });
  };

  console.log('its open');

  const categoryFilterOnClickHandler = () => {
    setSearchParams((prevParams) => {
      if (categoryFilterArray.length !== 0) {
        prevParams.set('categories', categoryFilterArray.join('&'));
      } else {
        prevParams.delete('categories');
      }

      return prevParams;
    });
    setCurrentPage(1);
  };

  if (categoriesIsLoading || !categories) return <Loading />;

  return (
    <StyledModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      onClick={categoryFilterOnClickHandler}
    >
      <CategoryFilterList>
        {categories.map((category: ICategory) => (
          <CategoryFilter key={category._id}>
            <CategoryLabel>
              <CategoryCheckBoxContainer
                onClick={() => handleCheckboxOnClickHandler(category._id)}
              >
                <CategoryCheckBox
                  type="checkbox"
                  checked={categoryFilterArray.includes(category._id)}
                />
                <CategoriesFilterTitleContainer>
                  <CategoriesFilterTitle>{category.name}</CategoriesFilterTitle>
                </CategoriesFilterTitleContainer>
              </CategoryCheckBoxContainer>
            </CategoryLabel>
          </CategoryFilter>
        ))}
      </CategoryFilterList>
    </StyledModal>
  );
};

export default CategoryFilterModal;
