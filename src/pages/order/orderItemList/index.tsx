import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import { ICartItem } from 'types';
import { useGetProductByIdQuery } from 'redux/services/productApi/productApi';
import { Card, Loading, QuantityTogglerInput } from 'components/common';
import OrderItemListHeader from 'pages/order/orderItemList/orderItemListHeader';

interface IOrderItemListProps {
  items: ICartItem[];
}

interface IOrderItemItemProps {
  productId: string;
  shopId: string;
  totalProductPrice: number;
  totalProductQuantity: number;
}

const OrderItemListFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

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

const OrderItemItem: React.FC<IOrderItemItemProps> = ({
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

  if (isLoading) return <Loading />;

  if (!product) return <h4>Product is not found</h4>;

  const decrementQuantityToPurchase = () => {
    setQuantityToPurchase((value) => Number(value) - 1);
  };

  const incrementQuantityToPurchase = () => {
    setQuantityToPurchase((value) => Number(value) + 1);
  };

  const changeQuantityToPurchase = (event: ChangeEvent) => {
    setQuantityToPurchase(Number((event.target as HTMLInputElement).value));
  };

  const { name, mainImage, price } = product;

  return (
    <div>
      <OrderItemFlexWrapper>
        <OrderItemImageWrapper>
          <OrderItemImageContainer>
            <OrderItemImage src={mainImage} />
          </OrderItemImageContainer>
        </OrderItemImageWrapper>
        <OrderItemDetailContainer>
          <h5>{name}</h5>
        </OrderItemDetailContainer>
        <OrderItemDetailContainer>
          <h5>&#8369;{price}</h5>
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
          <h5>&#8369;{totalProductPrice}</h5>
        </OrderItemDetailContainer>
      </OrderItemFlexWrapper>
    </div>
  );
};

const OrderItemList: React.FC<IOrderItemListProps> = ({ items }) => {
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
