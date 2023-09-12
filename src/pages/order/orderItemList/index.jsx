import React, { useState } from 'react';
import { Card, QuantityTogglerInput } from '../../../components/common';
import styled from 'styled-components';
import { useGetProductByIdQuery } from '../../../redux/services/productApi';
import OrderItemListHeader from './orderItemListHeader';

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
`;

const OrderItemImageContainer = styled.div`
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

const OrderItemImage = styled.img`
  object-fit: cover;
  height: 15rem;
`;

const OrderItemDetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
`;
const OrderItemName = styled.h5``;

const OrderItemUnitPrice = styled.h5``;

const OrderItemTotalPrice = styled.h5``;

const OrderItemItem = ({
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

  const decrementQuantityToPurchase = () => {
    setQuantityToPurchase((value) => Number(value) - 1);
  };

  const incrementQuantityToPurchase = () => {
    setQuantityToPurchase((value) => Number(value) + 1);
  };

  const changeQuantityToPurchase = (event) => {
    setQuantityToPurchase(event.target.value);
  };

  const { name, mainImage, price } = product;

  return (
    <OrderItemContainer>
      <OrderItemFlexWrapper>
        <OrderItemImageContainer>
          <OrderItemImage src={mainImage} />
        </OrderItemImageContainer>
        <OrderItemDetailContainer>
          <OrderItemName>{name}</OrderItemName>
        </OrderItemDetailContainer>
        <OrderItemDetailContainer>
          <OrderItemUnitPrice>&#8369;{price}</OrderItemUnitPrice>
        </OrderItemDetailContainer>
        <OrderItemDetailContainer>
          <QuantityTogglerInput
            decrementQuantityToggle={decrementQuantityToPurchase}
            incrementQuantityToggle={incrementQuantityToPurchase}
            onChangeHandler={changeQuantityToPurchase}
            QuantityInputValue={quantityToPurchase}
          />
        </OrderItemDetailContainer>
        <OrderItemDetailContainer>
          <OrderItemTotalPrice>&#8369;{totalProductPrice}</OrderItemTotalPrice>
        </OrderItemDetailContainer>
      </OrderItemFlexWrapper>
    </OrderItemContainer>
  );
};

const OrderItemList = ({ items }) => {
  return (
    <Card>
      <OrderItemListHeader />
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

export default OrderItemList;
