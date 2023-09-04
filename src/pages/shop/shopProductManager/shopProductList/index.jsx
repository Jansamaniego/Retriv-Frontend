import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../../components/common';
import { useGetProductsByShopIdQuery } from '../../../../redux/services/productApi';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

const StyledCard = styled(Card)`
  min-height: 12vh;

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

const ShopProductItem = ({ id, shopId }) => {
  const navigate = useNavigate();

  const { product, isLoading } = useGetProductsByShopIdQuery(shopId, {
    selectFromResult: ({ data }) => {
      return {
        product: data?.find((product) => product.id === id),
      };
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (!product) return <h1>No product</h1>;

  const { name, price, mainImage, quantitySold, id: productId } = product;

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

const ShopProductList = ({ products }) => {
  const { currentShop } = useSelector((state) => state.shopState);
  const { shopId } = useParams();
  return products.map(({ id }) => (
    <ShopProductItem
      key={id}
      id={id}
      shopId={shopId ? shopId : currentShop._id}
    />
  ));
};

export default ShopProductList;
