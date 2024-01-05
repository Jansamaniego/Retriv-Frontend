import React from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IProduct } from 'types';
import { useGetProductsQuery } from 'redux/services/productApi/productApi';
import { Card, Loading } from 'components/common';

interface IProductListProps {
  products: IProduct[];
}

interface IProductItemProps {
  id: string;
}

interface IProductCardProps {
  onClick: () => void;
  children: React.ReactNode;
}

const StyledCard = styled(Card)`
  padding: 0;
  padding-top: 0.8rem;
  min-height: 12vh;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.08);
    transform-origin: center;
    box-shadow: 0 30px 45px 0 rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(-10px);
    transition: 0.2s;
  }
`;

const ProductImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 20rem;
  height: 20rem;
  object-fit: cover;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 1.6rem;
`;

const ProductInfoName = styled.div`
  width: 100%;
`;

const Name = styled.h5`
  color: ${(props) => props.theme.neutral[300]};
  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.h5`
  color: ${(props) => props.theme.primary[500]};
`;

const QuantitySold = styled.h5`
  color: ${(props) => props.theme.neutral[500]};
`;

const ProductInfoDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductListText = styled.h3`
  color: ${(props) => props.theme.neutral.text};
`;

const ProductCard: React.FC<IProductCardProps> = ({ children, onClick }) => {
  return (
    <StyledCard onClick={onClick} hoverAnimate={true}>
      {children}
    </StyledCard>
  );
};

const ProductItem: React.FC<IProductItemProps> = ({ id }) => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { product, isLoading } = useGetProductsQuery(
    searchParams.size ? searchParams.toString() : '',
    {
      selectFromResult: ({ data, isLoading }) => {
        return {
          product: data?.results?.find((product) => product._id === id),
          isLoading,
        };
      },
    }
  );

  if (isLoading) return <Loading />;

  if (!product) return <ProductListText>Product is not found</ProductListText>;

  const {
    name,
    price,
    mainImage,
    quantitySold,
    shop: shopId,
    _id: productId,
  } = product;

  const navigateProduct = () => {
    navigate(`/shop/${shopId}/product/${productId}`);
  };

  return (
    <ProductCard onClick={navigateProduct}>
      <ProductImageContainer>
        <ProductImage src={mainImage} />
      </ProductImageContainer>
      <ProductInfoContainer>
        <ProductInfoName>
          <Name>{name}</Name>
        </ProductInfoName>
        <ProductInfoDetails>
          <Price>&#x20B1;{price}</Price>
          <QuantitySold>{quantitySold} sold</QuantitySold>
        </ProductInfoDetails>
      </ProductInfoContainer>
    </ProductCard>
  );
};

const ProductList: React.FC<IProductListProps> = ({ products }) => {
  return products.map(({ _id }) => <ProductItem key={_id} id={_id} />);
};

export default ProductList;
