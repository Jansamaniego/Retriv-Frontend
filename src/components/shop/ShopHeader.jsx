import React from 'react';
import styled from 'styled-components';
import { Card } from '../common';
import ProfileImageLogo from '../profile/ProfileImageLogo';
import {
  DateIcon,
  ProductIcon,
  ProductsSoldIcon,
  StarRatingIcon,
} from '../../assets/icons';

const ShopHeaderFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4rem;
`;

const ShopImageAndInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  max-width: 175ch;
  width: 40%;
`;

const ShopInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  max-width: 75ch;
`;

const NameContainer = styled.div``;

const Name = styled.h5`
  font-weight: 700;
`;

const DescriptionContainer = styled.div``;

const Description = styled.h5`
  font-weight: 400;
`;

const AddressContainer = styled.div``;

const Address = styled.h5`
  font-weight: 400;
`;

const ShopHeaderStatsContainer = styled.section`
  padding: 1rem;
  width: 60%;
`;

const ShopHeaderStatsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 3rem;
  column-gap: 3rem;
`;

const ShopHeaderStatContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ShopStat = styled.h5`
  font-weight: 300;
`;

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
        <ShopImageAndInfoContainer>
          <ProfileImageLogo profileImage={shopImage} imageWidth="20rem" />
          <ShopInfoContainer>
            <NameContainer>
              <Name>{name}</Name>
            </NameContainer>
            <DescriptionContainer>
              <Description>{description}</Description>
            </DescriptionContainer>
            <AddressContainer>
              <Address>{address}</Address>
            </AddressContainer>
          </ShopInfoContainer>
        </ShopImageAndInfoContainer>
        <ShopHeaderStatsContainer>
          <ShopHeaderStatsGridWrapper>
            <ShopHeaderStatContainer>
              <ProductIcon width="2rem" />
              <ShopStat>Products: {productsQuantity}</ShopStat>
            </ShopHeaderStatContainer>
            <ShopHeaderStatContainer>
              <ProductsSoldIcon width="2rem" />
              <ShopStat>Units Sold: {totalUnitsSold}</ShopStat>
            </ShopHeaderStatContainer>
            <ShopHeaderStatContainer>
              <StarRatingIcon width="2rem" />
              <ShopStat>
                Rating: {ratingsAverage} &#40;{ratingsQuantity}{' '}
                {ratingsQuantity > 1 ? 'ratings' : 'rating'}&#41;
              </ShopStat>
            </ShopHeaderStatContainer>
            <ShopHeaderStatContainer>
              <DateIcon width="2rem" />
              <ShopStat>Joined: {createdAt}</ShopStat>
            </ShopHeaderStatContainer>
          </ShopHeaderStatsGridWrapper>
        </ShopHeaderStatsContainer>
      </ShopHeaderFlexWrapper>
    </Card>
  );
};

export default ShopHeader;
