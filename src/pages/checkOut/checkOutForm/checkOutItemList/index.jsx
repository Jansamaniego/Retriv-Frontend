import React, { useState } from 'react';
import { Card, QuantityTogglerInput } from '../../../../components/common';
import styled from 'styled-components';
import { useGetProductByIdQuery } from '../../../../redux/services/productApi/productApi';
import CheckOutItemListHeader from './checkOutItemListHeader';

const OrderItemListFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OrderItemContainer = styled.div``;

const OrderItemFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1.6rem;
  }

  @media (max-width: 635px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1.6rem;
  }

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

const OrderItemImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 10rem;
  max-width: 15rem;
  width: 100%;

  @media (max-width: 900px) {
    max-width: 30rem;
  }
`;

const OrderItemImageContainer = styled.div`
  display: flex;
  justify-content: center;
  outline: 1px solid ${(props) => props.theme.primary.main};
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
`;

const OrderItemImage = styled.img`
  width: 16rem;
  height: 12rem;
  object-fit: cover;
`;

const OrderItemDetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  max-width: 30rem;
  width: 100%;
`;

const OrderItemNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  max-width: 30rem;
  width: 100%;

  @media (max-width: 900px) {
    grid-column: 1;
  }
`;

const OrderItemName = styled.h5``;

const PriceLabel = styled.h5`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const OrderItemPriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  max-width: 30rem;
  width: 100%;

  @media (max-width: 900px) {
    grid-column: 1;
  }
`;

const OrderItemUnitPrice = styled.h5``;

const OrderItemQuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  max-width: 30rem;
  width: 100%;

  @media (max-width: 900px) {
    grid-column: 2;
    grid-row: 1;
  }
`;

const QuantityLabel = styled.h5`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const Quantity = styled.h5``;

const OrderItemTotalPriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  max-width: 30rem;
  width: 100%;

  @media (max-width: 900px) {
    grid-column: 2;
    grid-row: 2;
  }
`;

const TotalPriceLabel = styled.h5`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const OrderItemTotalPrice = styled.h5``;

const OrderItemItem = ({
  productId,
  shopId,
  totalProductPrice,
  totalProductQuantity,
}) => {
  const { data: product, isLoading } = useGetProductByIdQuery({
    shopId,
    productId,
  });

  if (isLoading) return <h1>Loading...</h1>;

  const { name, mainImage, price } = product;

  return (
    <OrderItemContainer>
      <OrderItemFlexWrapper>
        <OrderItemImageWrapper>
          <OrderItemImageContainer>
            <OrderItemImage src={mainImage} />
          </OrderItemImageContainer>
        </OrderItemImageWrapper>
        <OrderItemNameContainer>
          <OrderItemName>{name}</OrderItemName>
        </OrderItemNameContainer>
        <OrderItemPriceContainer>
          <PriceLabel>Price: &nbsp;</PriceLabel>
          <OrderItemUnitPrice>&#8369;{price}</OrderItemUnitPrice>
        </OrderItemPriceContainer>
        <OrderItemQuantityContainer>
          <QuantityLabel>Quantity: &nbsp;</QuantityLabel>
          <Quantity>{totalProductQuantity}</Quantity>
        </OrderItemQuantityContainer>
        <OrderItemTotalPriceContainer>
          <TotalPriceLabel>Total Price: &nbsp;</TotalPriceLabel>
          <OrderItemTotalPrice>&#8369;{totalProductPrice}</OrderItemTotalPrice>
        </OrderItemTotalPriceContainer>
      </OrderItemFlexWrapper>
    </OrderItemContainer>
  );
};

const CheckOutItemList = ({ items }) => {
  return (
    <Card>
      <CheckOutItemListHeader />
      <OrderItemListFlexWrapper>
        {items.map(
          ({
            product,
            shop,
            _id: id,
            totalProductPrice,
            totalProductQuantity,
          }) => (
            <OrderItemItem
              key={id}
              productId={product}
              shopId={shop}
              totalProductPrice={totalProductPrice}
              totalProductQuantity={totalProductQuantity}
            />
          )
        )}
      </OrderItemListFlexWrapper>
    </Card>
  );
};

export default CheckOutItemList;
