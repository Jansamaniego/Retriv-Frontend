import React from 'react';
import { useGetShopByIdQuery } from '../../../redux/services/shopApi';
import { useGetShopRatingsQuery } from '../../../redux/services/ratings/shopRatingsApi';
import { useGetShopStatsQuery } from '../../../redux/services/stats/shopStatsApi';
import {
  Card,
  ContentFlexWrapper,
  Loading,
  ProfileImageLogo,
} from '../../../components/common';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ProductShopInfoFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const ProductShopPreviewContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 2.4rem;
`;

const ProductShopNameContainer = styled.div``;

const ProductShopName = styled.h5``;

const ProductShopDescriptionContainer = styled.div``;

const ProductShopDescription = styled.h5`
  font-weight: 300;
`;

const ProductShopInfo = styled.div``;

const ProductShopStatsFlexWrapper = styled.div`
  display: flex;
`;

const ProductShopStats = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3.2rem;
  row-gap: 3.2rem;
  padding: 1.6rem;
  width: 100%;
`;

const ProductShopStatsItemContainer = styled.div`
  width: clamp(13rem, 11.704rem + 3.457vw, 20rem);

  @media (max-width: 900px) {
    max-width: 30rem;
    min-width: 8rem;
    width: 100%;
  }
`;

const ProductShopStatsItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Tag = styled.h6`
  font-weight: 300;
`;

const Value = styled.h6``;

const ProductShop = ({ shopId }) => {
  const navigate = useNavigate();
  const { data: shop, shopIsLoading } = useGetShopByIdQuery(shopId);

  let { data: shopRating, shopRatingIsLoading } =
    useGetShopRatingsQuery(shopId);

  if (!shop || shopIsLoading || shopRatingIsLoading) return <Loading />;

  if (!shopRating) {
    shopRating = {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    };
  }

  let { ratingsAverage, ratingsQuantity } = shopRating;

  const { name, description, shopImage, productsQuantity, totalUnitsSold } =
    shop;

  if (!ratingsAverage) ratingsAverage = 0;
  if (!ratingsQuantity) ratingsQuantity = 0;

  const navigateShop = () => {
    navigate(`/shop/${shopId}`, { relative: false });
  };

  return (
    <Card>
      <ContentFlexWrapper
        justifyContent="space-between"
        columnBreakPoint="900px"
      >
        <ProductShopInfo>
          <ProductShopInfoFlex>
            <ProfileImageLogo
              profileImage={shopImage}
              size="10rem"
              onClick={navigateShop}
            />
            <ProductShopPreviewContainer>
              <ProductShopNameContainer>
                <ProductShopName>{name}</ProductShopName>
              </ProductShopNameContainer>
              <ProductShopDescriptionContainer>
                <ProductShopDescription>{description}</ProductShopDescription>
              </ProductShopDescriptionContainer>
            </ProductShopPreviewContainer>
          </ProductShopInfoFlex>
        </ProductShopInfo>
        <ProductShopStatsFlexWrapper>
          <ProductShopStats>
            <ProductShopStatsItemContainer>
              <ProductShopStatsItem>
                <Tag>Average Ratings </Tag>
                <Value>{ratingsAverage}</Value>
              </ProductShopStatsItem>
            </ProductShopStatsItemContainer>
            <ProductShopStatsItemContainer>
              <ProductShopStatsItem>
                <Tag>Ratings</Tag> <Value>{ratingsQuantity}</Value>
              </ProductShopStatsItem>
            </ProductShopStatsItemContainer>
            <ProductShopStatsItemContainer>
              <ProductShopStatsItem>
                <Tag> Products</Tag> <Value>{productsQuantity}</Value>
              </ProductShopStatsItem>
            </ProductShopStatsItemContainer>
            <ProductShopStatsItemContainer>
              <ProductShopStatsItem>
                <Tag> Products Sold</Tag> <Value>{totalUnitsSold}</Value>
              </ProductShopStatsItem>
            </ProductShopStatsItemContainer>
          </ProductShopStats>
        </ProductShopStatsFlexWrapper>
      </ContentFlexWrapper>
    </Card>
  );
};

export default ProductShop;
