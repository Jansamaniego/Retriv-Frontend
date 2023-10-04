import React, { useState } from 'react';
import { Card, QuantityTogglerInput } from '../common';
import styled from 'styled-components';
import { useGetProductByIdQuery } from '../../redux/services/productApi/productApi';

const PlacedOrderItemListFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PlacedOrderItemContainer = styled.div``;

const PlacedOrderItemFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PlacedOrderItemImageContainer = styled.div`
  display: flex;
  justify-content: center;
  outline: 1px solid ${(props) => props.theme.primary.main};
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 15rem;

  &:hover {
    cursor: pointer;
  }
`;

const PlacedOrderItemImage = styled.img`
  object-fit: cover;
  height: 15rem;
`;

const PlacedOrderItemDetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
`;
const PlacedOrderItemName = styled.h5``;

const PlacedOrderItemUnitPrice = styled.h5``;

const PlacedOrderItemQuantity = styled.h5``;

const PlacedOrderItemTotalPrice = styled.h5``;

const PlacedOrderItemItem = ({
  productId,
  shopId,
  totalProductPrice,
  totalProductQuantity,
}) => {
  const [quantityToPurchase, setQuantityToPurchase] =
    useState(totalProductQuantity);
  const { data: product, isLoading } = useGetProductByIdQuery({
    shopId,
    productId,
  });

  if (isLoading) return <h1>Loading...</h1>;

  const { name, mainImage, price } = product;

  return (
    <PlacedOrderItemContainer>
      <PlacedOrderItemFlexWrapper>
        <PlacedOrderItemImageContainer>
          <PlacedOrderItemImage src={mainImage} />
        </PlacedOrderItemImageContainer>
        <PlacedOrderItemDetailContainer>
          <PlacedOrderItemName>{name}</PlacedOrderItemName>
        </PlacedOrderItemDetailContainer>
        <PlacedOrderItemDetailContainer>
          <PlacedOrderItemUnitPrice>&#8369;{price}</PlacedOrderItemUnitPrice>
        </PlacedOrderItemDetailContainer>
        <PlacedOrderItemDetailContainer>
          <PlacedOrderItemQuantity>
            {totalProductQuantity}
          </PlacedOrderItemQuantity>
        </PlacedOrderItemDetailContainer>
        <PlacedOrderItemDetailContainer>
          <PlacedOrderItemTotalPrice>
            &#8369;{totalProductPrice}
          </PlacedOrderItemTotalPrice>
        </PlacedOrderItemDetailContainer>
      </PlacedOrderItemFlexWrapper>
    </PlacedOrderItemContainer>
  );
};

const PlacedOrderItemList = ({ items }) => {
  return (
    <Card>
      {/* <OrderItemListHeader /> */}
      <PlacedOrderItemListFlexWrapper>
        {items.map(
          ({
            product,
            shop,
            _id: id,
            totalProductPrice,
            totalProductQuantity,
          }) => (
            <PlacedOrderItemItem
              key={id}
              productId={product}
              shopId={shop}
              totalProductPrice={totalProductPrice}
              totalProductQuantity={totalProductQuantity}
            />
          )
        )}
      </PlacedOrderItemListFlexWrapper>
    </Card>
  );
};

export default PlacedOrderItemList;
