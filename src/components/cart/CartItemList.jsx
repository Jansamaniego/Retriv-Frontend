import React from 'react';
import { useGetProductByIdQuery } from '../../redux/services/productApi';
import styled from 'styled-components';

const CartItemContainer = styled.div``;

const CartItemItem = ({
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

  const { name, mainImage } = product;

  return <CartItemContainer>product</CartItemContainer>;
};

const CartItemList = ({ cartItems }) => {
  return cartItems.map(
    ({ product, shop, _id: id, totalProductPrice, totalProductQuantity }) => (
      <CartItemItem
        key={id}
        productId={product}
        shopId={shop}
        totalProductPrice={totalProductPrice}
        totalProductQuantity={totalProductQuantity}
      />
    )
  );
};

export default CartItemList;
