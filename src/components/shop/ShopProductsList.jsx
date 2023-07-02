import React from 'react';
import styled from 'styled-components';
import { Card } from '../common';
import { useGetProductsByShopIdQuery } from '../../redux/services/productApi';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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

const ShopProductItem = ({ id }) => {
  const navigate = useNavigate();
  const { shopId } = useParams();
  const { product, isLoading } = useGetProductsByShopIdQuery(shopId, {
    selectFromResult: ({ data }) => {
      console.log(data);
      return {
        product: data?.find((product) => product.id === id),
      };
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

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

const ShopProductsList = ({ products }) => {
  return products.map(({ id }) => <ShopProductItem key={id} id={id} />);
};

export default ShopProductsList;
