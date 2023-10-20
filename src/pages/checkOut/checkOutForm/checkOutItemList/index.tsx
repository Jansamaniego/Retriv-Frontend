import React from 'react';
import styled from 'styled-components';

import { ICartItem } from 'types';
import { useGetProductByIdQuery } from 'redux/services/productApi/productApi';
import { Card } from 'components/common';
import CheckOutItemListHeader from 'pages/checkOut/checkOutForm/checkOutItemList/checkOutItemListHeader';

interface CheckOutItemListProps {
  items: ICartItem[];
}

interface CheckOutItemItemProps {
  shopId: string;
  productId: string;
  totalProductPrice: number;
  totalProductQuantity: number;
}

const CheckOutItemListFlexWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CheckOutItemContainer = styled.div``;

const CheckOutItemFlexWrapper = styled.div`
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

const CheckOutItemImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 10rem;
  max-width: 15rem;
  width: 100%;

  @media (max-width: 900px) {
    max-width: 30rem;
  }
`;

const CheckOutItemImageContainer = styled.div`
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

const CheckOutItemImage = styled.img`
  width: 16rem;
  height: 12rem;
  object-fit: cover;
`;

const CheckOutItemNameContainer = styled.div`
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

const CheckOutItemName = styled.h5``;

const PriceLabel = styled.h5`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const CheckOutItemPriceContainer = styled.div`
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

const CheckOutItemUnitPrice = styled.h5``;

const CheckOutItemQuantityContainer = styled.div`
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

const CheckOutItemTotalPriceContainer = styled.div`
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

const CheckOutItemTotalPrice = styled.h5``;

const CheckOutItemItem: React.FC<CheckOutItemItemProps> = ({
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

  if (!product) return <h3>Product is not found</h3>;

  const { name, mainImage, price } = product;

  return (
    <CheckOutItemContainer>
      <CheckOutItemFlexWrapper>
        <CheckOutItemImageWrapper>
          <CheckOutItemImageContainer>
            <CheckOutItemImage src={mainImage} />
          </CheckOutItemImageContainer>
        </CheckOutItemImageWrapper>
        <CheckOutItemNameContainer>
          <CheckOutItemName>{name}</CheckOutItemName>
        </CheckOutItemNameContainer>
        <CheckOutItemPriceContainer>
          <PriceLabel>Price: &nbsp;</PriceLabel>
          <CheckOutItemUnitPrice>&#8369;{price}</CheckOutItemUnitPrice>
        </CheckOutItemPriceContainer>
        <CheckOutItemQuantityContainer>
          <QuantityLabel>Quantity: &nbsp;</QuantityLabel>
          <Quantity>{totalProductQuantity}</Quantity>
        </CheckOutItemQuantityContainer>
        <CheckOutItemTotalPriceContainer>
          <TotalPriceLabel>Total Price: &nbsp;</TotalPriceLabel>
          <CheckOutItemTotalPrice>
            &#8369;{totalProductPrice}
          </CheckOutItemTotalPrice>
        </CheckOutItemTotalPriceContainer>
      </CheckOutItemFlexWrapper>
    </CheckOutItemContainer>
  );
};

const CheckOutItemList: React.FC<CheckOutItemListProps> = ({ items }) => {
  return (
    <Card>
      <CheckOutItemListHeader />
      <CheckOutItemListFlexWrapper>
        {items.map(
          ({
            product,
            shop,
            _id: id,
            totalProductPrice,
            totalProductQuantity,
          }) =>
            typeof product === 'string' &&
            typeof shop === 'string' && (
              <CheckOutItemItem
                key={id}
                productId={product}
                shopId={shop}
                totalProductPrice={totalProductPrice}
                totalProductQuantity={totalProductQuantity}
              />
            )
        )}
      </CheckOutItemListFlexWrapper>
    </Card>
  );
};

export default CheckOutItemList;
