import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IProduct } from 'types';
import { RootState } from 'redux/store';
import { useGetProductsByShopIdQuery } from 'redux/services/productApi/productApi';
import { Card, Loading } from 'components/common';

interface IShopProductListProps {
  products: IProduct[];
}

interface IShopProductItemProps {
  id: string;
  shopId: string;
}

interface IProductCardProps {
  children: React.ReactNode;
  onClick: () => void;
}

const StyledCard = styled(Card)`
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

const ProductCard: React.FC<IProductCardProps> = ({ children, onClick }) => {
  return <StyledCard onClick={onClick}>{children}</StyledCard>;
};

const ShopProductItem: React.FC<IShopProductItemProps> = ({ id, shopId }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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

  if (isLoading) return <Loading />;

  if (!product) return null;

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

const ShopProductList: React.FC<IShopProductListProps> = ({ products }) => {
  const { currentShop } = useSelector((state: RootState) => state.shopState);

  const { shopId = currentShop?.id || '' } = useParams();

  return products.map(({ id }) => (
    <ShopProductItem key={id} id={id} shopId={shopId} />
  ));
};

export default ShopProductList;
