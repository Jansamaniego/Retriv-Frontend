import React, { useEffect } from 'react';
import {
  productApi,
  useGetProductsQuery,
} from '../../../../redux/services/productApi';
import { Card } from '../../../../components/common';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyledCard = styled(Card)`
  min-height: 12vh;
  /* padding: 1rem; */

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
  height: 16rem;
  object-fit: cover;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 14rem;
  gap: 1.6rem;
  padding: 1.6rem;
`;

const ProductInfoName = styled.div``;

const Name = styled.div`
  font-size: 2rem;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
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
          product: data?.results?.find((product) => product._id === id),
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

const ProductList = ({ products }) => {
  return products.map(({ _id }) => <ProductItem key={_id} id={_id} />);
};

export default ProductList;
