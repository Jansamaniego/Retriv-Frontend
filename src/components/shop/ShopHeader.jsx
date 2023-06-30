import React from 'react';
import styled from 'styled-components';
import { Card } from '../common';

const ShopHeaderFlexWrapper = styled.div``;

const ShopImageAndNameContainer = styled.div``;

const NameContainer = styled.div``;

const Name = styled.h5``;

const ShopHeaderImageContainer = styled.div``;

const ShopImage = styled.img``;

const ShopHeaderStatsContainer = styled.section``;

const ShopHeaderStatsGridWrapper = styled.div``;

const DescriptionContainer = styled.div``;

const Description = styled.h5``;

const AddressContainer = styled.div``;

const Address = styled.h5``;

const ProductsQuantityContainer = styled.div``;

const ProductsQuantity = styled.h5``;

const UnitsSoldContainer = styled.div``;

const UnitsSold = styled.h5``;

const RatingAvgAndQuantityContainer = styled.div``;

const RatingAvgAndQuantity = styled.h5``;

const JoinedMonthsAgoContainer = styled.div``;

const JoinedMonthsAgo = styled.h5``;

const ShopHeader = ({ shop, shopRatings }) => {
  console.log(shop);
  console.log(shopRatings);
  const {
    shopImage,
    name,
    description,
    address,
    productsQuantity,
    totalUnitsSold,
    createdAt,
  } = shop;

  const { ratingsAverage, ratingsQuantity } = shopRatings;
  return (
    <Card>
      <ShopHeaderFlexWrapper>
        <ShopImageAndNameContainer>
          <ShopHeaderImageContainer>
            <ShopImage src={shopImage} alt="shop" />
          </ShopHeaderImageContainer>
          <NameContainer>
            <Name></Name>
          </NameContainer>
        </ShopImageAndNameContainer>
        <ShopHeaderStatsContainer>
          <ShopHeaderStatsGridWrapper>
            <DescriptionContainer>
              <Description>{description}</Description>
            </DescriptionContainer>
            <AddressContainer>
              <Address>{address}</Address>
            </AddressContainer>
            <ProductsQuantityContainer>
              <ProductsQuantity>{productsQuantity}</ProductsQuantity>
            </ProductsQuantityContainer>
            <UnitsSoldContainer>
              <UnitsSold>{totalUnitsSold}</UnitsSold>
            </UnitsSoldContainer>
            <RatingAvgAndQuantityContainer>
              <RatingAvgAndQuantity>
                {ratingsAverage}-{ratingsQuantity} ratings
              </RatingAvgAndQuantity>
            </RatingAvgAndQuantityContainer>
            <JoinedMonthsAgoContainer>
              <JoinedMonthsAgo>{createdAt}</JoinedMonthsAgo>
            </JoinedMonthsAgoContainer>
          </ShopHeaderStatsGridWrapper>
        </ShopHeaderStatsContainer>
      </ShopHeaderFlexWrapper>
    </Card>
  );
};

export default ShopHeader;
