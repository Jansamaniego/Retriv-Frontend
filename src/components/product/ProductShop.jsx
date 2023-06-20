import React from 'react';
import { useGetShopByIdQuery } from '../../redux/services/shopApi';
import { useGetShopRatingsQuery } from '../../redux/services/ratings/shopRatingsApi';
import { useGetShopStatsQuery } from '../../redux/services/stats/shopStatsApi';
import { Card } from '../common';
import styled from 'styled-components';

const ProductShopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.2rem 0 1.6rem;
`;

const ProductShopInfoFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
`;

const ProductShopImageContainer = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  max-width: 15rem;
  height: 15rem;
`;

const ProductShopImage = styled.img`
  border-radius: 50%;
  outline: 0.1rem solid ${(props) => props.theme.neutral[300]};
  object-fit: cover;
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

const ProductShopStats = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3.2rem;
  row-gap: 3.2rem;
  padding: 1.6rem;
`;

const ProductShopStatsItemContainer = styled.div`
  width: 24rem;
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
  const { data: shop, shopIsLoading } = useGetShopByIdQuery(shopId);

  let { data: shopRating, shopRatingIsLoading } =
    useGetShopRatingsQuery(shopId);

  if (!shop || !shopRating || shopIsLoading || shopRatingIsLoading)
    return <h1>Loading...</h1>;

  if (!shopRating) {
    shopRating = {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    };
  }

  console.log(shop);

  let { ratingsAverage, ratingsQuantity } = shopRating;

  const { name, description, shopImage, productsQuantity, totalUnitsSold } =
    shop;

  if (!ratingsAverage) ratingsAverage = 0;
  if (!ratingsQuantity) ratingsQuantity = 0;

  return (
    <Card>
      <ProductShopWrapper>
        <ProductShopInfo>
          <ProductShopInfoFlex>
            <ProductShopImageContainer>
              <ProductShopImage src={shopImage} />
            </ProductShopImageContainer>
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
      </ProductShopWrapper>
    </Card>
  );
};

export default ProductShop;
