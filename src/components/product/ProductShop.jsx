import React from 'react';
import { useGetShopByIdQuery } from '../../redux/services/shopApi';
import { Card } from '../common';
import styled from 'styled-components';

const ProductShopImageContainer = styled.div``;

const ProductShopImage = styled.img``;

const ProductShopPreviewContainer = styled.section``;

const ProductShopNameContainer = styled.div``;

const ProductShopName = styled.h5``;

const ProductShopDescriptionContainer = styled.div``;

const ProductShopDescription = styled.h5``;

const ProductShopAddressContainer = styled.div``;

const ProductShopAddress = styled.h5``;

const ProductShop = ({ shopId }) => {
  const { data: shop, isLoading } = useGetShopByIdQuery(shopId);

  if (!shop || isLoading) return <h1>Loading...</h1>;

  const { name, description, shopImage, address } = shop;

  console.log(shop);
  return (
    <Card>
      <ProductShopImageContainer>
        <ProductShopImage src={shopImage} />
      </ProductShopImageContainer>
      <ProductShopPreviewContainer>
        <ProductShopNameContainer>
          <ProductShopName>Name: {name}</ProductShopName>
        </ProductShopNameContainer>
        <ProductShopDescriptionContainer>
          <ProductShopDescription>
            Description: {description}
          </ProductShopDescription>
        </ProductShopDescriptionContainer>
        <ProductShopAddressContainer>
          <ProductShopAddress>Address: {address}</ProductShopAddress>
        </ProductShopAddressContainer>
      </ProductShopPreviewContainer>
    </Card>
  );
};

export default ProductShop;
