import React from 'react';
import styled from 'styled-components';
import { Card, ProfileImageLogo } from '../../../components/common';
import {
  DateIcon,
  EditIcon,
  ProductIcon,
  ProductsSoldIcon,
  StarRatingIcon,
} from '../../../assets/icons';
import { useGetShopRatingsQuery } from '../../../redux/services/ratings/shopRatingsApi/shopRatingsApi';
import { IShop } from 'src/types';
import { IShopWithOwnerPickValues } from 'src/redux/services/shopApi/shopApi.types';
import moment from 'moment';
import { IShopRatings } from 'src/redux/services/ratings/shopRatingsApi/shopRatingsApi.types';

interface IShopHeaderProps {
  shop: IShopWithOwnerPickValues;
  shopRatings: IShopRatings;
}

const ShopHeaderFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  gap: 4rem;

  @media (max-width: 1124px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ShopImageAndInfoContainer = styled.div`
  position: relative;
  display: flex;
  gap: 2rem;
  /* width: 100%; */
  /* justify-content: space-between; */
  /* min-width: 110rem; */
  @media (max-width: 680px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ShopImageContainer = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
`;

const ShopImage = styled.img`
  position: relative;
  border-radius: 50%;
  outline: 0.5rem solid ${(props) => props.theme.neutral[900]};
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  /* max-width: 75ch; */
  width: 100%;
`;

const ShopInfoContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 2rem;
  padding-top: 1rem;
  min-width: 20ch;
  /* max-width: 75ch;
  width: 100%; */
  word-wrap: break-word;

  @media (max-width: 1570px) {
    flex-direction: column;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  word-wrap: break-word;
  width: 50ch;
`;

const InfoContainer = styled.div`
  word-wrap: break-word;
  /* width: 100%; */
`;

const Info = styled.h5`
  font-weight: 700;
`;

const SubInfo = styled.h6`
  font-weight: 400;
`;

const ShopHeaderStatsContainer = styled.section`
  margin-top: 3.5rem;
  padding: 1rem;
  width: 60%;

  @media (max-width: 1124px) {
    width: inherit;
    margin-top: 0;
  }
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

const ShopHeader: React.FC<IShopHeaderProps> = ({ shop, shopRatings }) => {
  const {
    id,
    shopImage,
    name,
    description,
    phone,
    address,
    productsQuantity,
    totalUnitsSold,
    createdAt,
  } = shop;

  if (!shopRatings) return <h3>No shop ratings found</h3>;

  const { ratingsAverage, ratingsQuantity } = shopRatings;

  return (
    <Card>
      <ShopHeaderFlexWrapper>
        <ShopImageAndInfoContainer>
          <div>
            <ShopImageContainer>
              {shopImage ? <ShopImage src={shopImage} /> : null}
            </ShopImageContainer>
          </div>
          <InfoFlexWrapper>
            <InfoWrapper>
              <InfoContainer>
                <Info>{name}</Info>
              </InfoContainer>
            </InfoWrapper>
            <ShopInfoContainer>
              <InfoWrapper>
                <InfoContainer>
                  <SubInfo>{description}</SubInfo>
                </InfoContainer>
              </InfoWrapper>
              <InfoWrapper>
                <InfoContainer>
                  <SubInfo>{address}</SubInfo>
                </InfoContainer>
                <InfoContainer>
                  <SubInfo>{phone}</SubInfo>
                </InfoContainer>
              </InfoWrapper>
            </ShopInfoContainer>
          </InfoFlexWrapper>
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
              <ShopStat>
                Joined: {moment(createdAt).format('MM-DD-yyyy')}
              </ShopStat>
            </ShopHeaderStatContainer>
          </ShopHeaderStatsGridWrapper>
        </ShopHeaderStatsContainer>
      </ShopHeaderFlexWrapper>
    </Card>
  );
};

export default ShopHeader;
