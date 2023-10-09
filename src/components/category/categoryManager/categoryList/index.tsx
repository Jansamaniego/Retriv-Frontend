import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../../components/common';
import { useGetCategoriesQuery } from '../../../../redux/services/categoryApi/categoryApi';
import { useNavigate } from 'react-router-dom';
import { ICategory } from 'src/types';

interface ICategoryListProps {
  categories: ICategory[];
}

interface ICategoryItemProps {
  id: string;
}

interface ICategoryCardProps {
  children: React.ReactNode;
  onClick: () => void;
}

const StyledCard = styled(Card)`
  min-height: 10vh;
  padding: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const CategoryItemFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

const CategoryImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CategoryImage = styled.img`
  height: 10rem;
  width: 20rem;
  object-fit: fill;
`;

const CategoryName = styled.h6``;

const CategoryCard: React.FC<ICategoryCardProps> = ({ children, onClick }) => {
  return <StyledCard onClick={onClick}>{children}</StyledCard>;
};

const CategoryItem: React.FC<ICategoryItemProps> = ({ id }) => {
  const navigate = useNavigate();
  const { category } = useGetCategoriesQuery(null, {
    selectFromResult: ({ data }) => {
      return {
        category: data?.results?.find((category) => category._id === id),
      };
    },
  });

  if (!category) return <h1>Category is not found</h1>;

  const { name, image } = category;

  const navigateCategory = () => {
    navigate(`/category/${id}`);
  };

  return (
    <CategoryCard onClick={navigateCategory}>
      <CategoryItemFlexWrapper>
        <CategoryImageContainer>
          <CategoryImage src={image} alt={name} />
        </CategoryImageContainer>
        <CategoryName>{name}</CategoryName>
      </CategoryItemFlexWrapper>
    </CategoryCard>
  );
};

const CategoryList: React.FC<ICategoryListProps> = ({ categories }) => {
  return categories.map(({ _id }) => <CategoryItem key={_id} id={_id} />);
};

export default CategoryList;
