import React, { useEffect } from 'react';
import {
  useGetProductsQuery,
  useGetProductsQuerySubscription,
} from '../../redux/services/productApi';
import { Card } from '../common';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

const StyledCard = styled(Card)`
  min-height: 12vh;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;

const ProductImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 16rem;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem;
`;

const ProductInfoName = styled.div``;

const Name = styled.h5`
  color: ${(props) => props.theme.neutral[300]};
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

const ProductCard = ({ children, onClick }) => {
  return <StyledCard onClick={onClick}>{children}</StyledCard>;
};

const ProductItem = ({ id }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { product } = useGetProductsQuery(
    searchParams.size ? searchParams.toString() : undefined,
    {
      selectFromResult: ({ data }) => {
        return {
          product: data?.results?.find((product) => product.id === id),
        };
      },
    }
  );

  const {
    name,
    price,
    mainImage,
    quantitySold,
    shop: shopId,
    id: productId,
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

const ProductList = ({ products }) => {
  console.log(products);
  return products.map(({ id }) => <ProductItem key={id} id={id} />);
};

export default ProductList;
