import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { ICategory } from 'types';
import { Card, Loading } from 'components/common';
import { useGetCategoriesQuery } from 'redux/services/categoryApi/categoryApi';

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
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.08);
    transform-origin: center;
    box-shadow: 0 30px 45px 0 rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(-10px);
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

const CategoryName = styled.h6`
  color: ${(props) => props.theme.neutral[300]};
  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CategoryCard: React.FC<ICategoryCardProps> = ({ children, onClick }) => {
  return <StyledCard onClick={onClick}>{children}</StyledCard>;
};

const CategoryItem: React.FC<ICategoryItemProps> = ({ id }) => {
  const navigate = useNavigate();
  const { category, isLoading } = useGetCategoriesQuery(null, {
    selectFromResult: ({ data, isLoading }) => {
      return {
        category: data?.results?.find((category) => category._id === id),
        isLoading,
      };
    },
  });

  if (isLoading) return <Loading />;

  if (!category) return null;

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
