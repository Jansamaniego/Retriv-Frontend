import React, { useEffect } from 'react';
import {
  productApi,
  useGetProductsQuery,
  useGetRecommendedProductsQuery,
} from '../../redux/services/productApi';
import { Card } from '../common';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StyledCard = styled(Card)`
  min-height: 12vh;
  padding: 1rem;

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

const RecommendedProductCard = ({ children, onClick }) => {
  return <StyledCard onClick={onClick}>{children}</StyledCard>;
};

const RecommendedProductItem = ({ id }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const { product } = useGetRecommendedProductsQuery(
    searchParams.size ? searchParams.toString() : undefined,
    {
      selectFromResult: ({ data }) => {
        console.log(data);
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
    <RecommendedProductCard onClick={navigateProduct}>
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
    </RecommendedProductCard>
  );
};

const RecommendedProductList = ({ products }) => {
  return products.map(({ _id }) => (
    <RecommendedProductItem key={_id} id={_id} />
  ));
};

export default RecommendedProductList;
