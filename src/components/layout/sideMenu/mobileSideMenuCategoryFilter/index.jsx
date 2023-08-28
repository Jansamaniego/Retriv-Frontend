import { useSearchParams } from 'react-router-dom';
import { FilterIcon } from '../../../../assets/icons';
import { useProductPagination } from '../../../../context/ProductPaginationContext';
import { useGetCategoriesQuery } from '../../../../redux/services/categoryApi';
import { Loading, StyledModal } from '../../../common';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const CategoryFilterIconContainer = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  color: ${(props) => props.theme.primary.main};
  padding: 1.6rem 0.8rem;
  border-radius: 0.5rem;

  & h5 {
    font-weight: 400;
  }

  &:hover {
    background-color: ${(props) => props.theme.neutral[800]};
  }

  @media (max-width: 1300px) {
    display: flex;
    align-items: center;
    padding: 2.4rem 3.2rem;
  }
`;

const CategoryFilterIconLabel = styled.h5`
  font-weight: 400;
  @media (max-width: 1300px) {
    font-size: 1.5rem;
  }
`;

const CategoryFilterList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  list-style: none;
  padding-left: 0;
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

const MobileSideMenuCategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryFilterArray, setCategoryFilterArray] = useState([]);
  const [isCategoryFilterModalOpen, setIsCategoryFilterModalOpen] =
    useState(false);
  const { setCurrentPage } = useProductPagination();

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

  useEffect(() => {
    const selectedCategories = searchParams.get('categories')?.split(',');
    setCategoryFilterArray(selectedCategories ? selectedCategories : []);
  }, [searchParams]);

  const showCategoryFilterModal = () => {
    setIsCategoryFilterModalOpen(true);
  };

  const closeCategoryFilterModal = () => {
    setIsCategoryFilterModalOpen(false);
  };

  const handleCheckboxOnClickHandler = (categoryId) => {
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

  const categoryFilterOnClickHandler = () => {
    setSearchParams((prevParams) => {
      if (categoryFilterArray.length !== 0) {
        prevParams.set('categories', categoryFilterArray);
      } else {
        prevParams.delete('categories');
      }

      return prevParams;
    });
    setCurrentPage(1);
  };

  if (categoriesIsLoading || !categories) return <Loading />;

  console.log(categoryFilterArray);

  return (
    <>
      <CategoryFilterIconContainer onClick={showCategoryFilterModal}>
        <FilterIcon width="3rem" />
        <CategoryFilterIconLabel>Filter</CategoryFilterIconLabel>
      </CategoryFilterIconContainer>
      {isCategoryFilterModalOpen && (
        <StyledModal
          showModal={showCategoryFilterModal}
          closeModal={closeCategoryFilterModal}
          onClick={categoryFilterOnClickHandler}
        >
          <CategoryFilterList>
            {categories.map((category) => (
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
                      <CategoriesFilterTitle>
                        {category.name}
                      </CategoriesFilterTitle>
                    </CategoriesFilterTitleContainer>
                  </CategoryCheckBoxContainer>
                </CategoryLabel>
              </CategoryFilter>
            ))}
          </CategoryFilterList>
        </StyledModal>
      )}
    </>
  );
};

export default MobileSideMenuCategoryFilter;
