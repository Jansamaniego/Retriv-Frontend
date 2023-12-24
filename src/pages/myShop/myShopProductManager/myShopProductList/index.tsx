import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { IProduct } from 'types';
import { RootState } from 'redux/store';
import { useGetProductsByShopIdQuery } from 'redux/services/productApi/productApi';
import { Card } from 'components/common';

interface IMyShopProductListProps {
  products: IProduct[];
}

interface IMyShopProductItemProps {
  id: string;
  shopId: string;
}
interface IProductCardProps {
  children: React.ReactNode;
  onClick: () => void;
}

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

const ProductCard: React.FC<IProductCardProps> = ({ children, onClick }) => {
  return <StyledCard onClick={onClick}>{children}</StyledCard>;
};

const ShopProductItem: React.FC<IMyShopProductItemProps> = ({ id, shopId }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { product, isLoading } = useGetProductsByShopIdQuery(
    { shopId, queryString: searchParams.toString() },
    {
      selectFromResult: ({ data, isLoading }) => {
        return {
          product: data?.results?.find((product) => product._id === id),
          isLoading,
        };
      },
    }
  );

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

const MyShopProductList: React.FC<IMyShopProductListProps> = ({ products }) => {
  const { currentShop } = useSelector((state: RootState) => state.shopState);

  return products.map(({ id }) => (
    <ShopProductItem key={id} id={id} shopId={currentShop!._id} />
  ));
};

export default MyShopProductList;
