import { useState } from 'react';
import styled from 'styled-components';

import { FilterIcon } from 'assets/icons';
import CategoryFilterModal from 'components/category/categoryFilterModal';

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

const MobileSideMenuCategoryFilter = () => {
  const [isCategoryFilterModalOpen, setIsCategoryFilterModalOpen] =
    useState<boolean>(false);

  const showCategoryFilterModal = () => {
    setIsCategoryFilterModalOpen(true);
  };

  const closeCategoryFilterModal = () => {
    setIsCategoryFilterModalOpen(false);
  };

  return (
    <>
      <CategoryFilterIconContainer onClick={showCategoryFilterModal}>
        <FilterIcon width="3rem" />
        <CategoryFilterIconLabel>Filter</CategoryFilterIconLabel>
      </CategoryFilterIconContainer>
      {isCategoryFilterModalOpen && (
        <CategoryFilterModal
          isModalOpen={isCategoryFilterModalOpen}
          closeModal={closeCategoryFilterModal}
        />
      )}
    </>
  );
};

export default MobileSideMenuCategoryFilter;
