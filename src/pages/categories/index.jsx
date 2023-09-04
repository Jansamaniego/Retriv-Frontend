import React from 'react';
import CategoryManager from '../components/category/CategoryManager';
import styled from 'styled-components';
import { Card, StyledLink, Button } from '../components/common';
import { useNavigate } from 'react-router-dom';

const CategoriesPageFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const Categories = () => {
  const navigate = useNavigate();

  const navigateCreateCategory = () => {
    navigate('/create-category');
  };

  return (
    <CategoriesPageFlexWrapper>
      <CategoryManager />
      <Card>
        <Button superLarge onClick={navigateCreateCategory}>
          Create a new category
        </Button>
      </Card>
    </CategoriesPageFlexWrapper>
  );
};
