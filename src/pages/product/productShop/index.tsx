import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useGetShopByIdQuery } from 'redux/services/shopApi/shopApi';
import { useGetShopRatingsQuery } from 'redux/services/ratings/shopRatingsApi/shopRatingsApi';
import {
  Card,
  ContentFlexWrapper,
  Loading,
  ProfileImageLogo,
} from 'components/common';

interface IProductShop {
  shopId: string;
}

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

const ProductShopDescription = styled.h5`
  font-weight: 300;
`;

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

const ProductShop: React.FC<IProductShop> = ({ shopId }) => {
  const navigate = useNavigate();
  const { data: shop, isLoading: shopIsLoading } = useGetShopByIdQuery(shopId);

  let { data: shopRating, isLoading: shopRatingIsLoading } =
    useGetShopRatingsQuery(shopId);

  if (!shop || shopIsLoading || shopRatingIsLoading) return <Loading />;

  let { ratingsAverage, ratingsQuantity } = shopRating || {
    ratingsAverage: 0,
    ratingsQuantity: 0,
  };

  const { name, description, shopImage, productsQuantity, totalUnitsSold } =
    shop;

  const navigateShop = () => {
    navigate(`/shop/${shopId}`, { relative: 'path' });
  };

  return (
    <Card>
      <ContentFlexWrapper
        justifyContent="space-between"
        columnBreakPoint="900px"
      >
        <div>
          <ProductShopInfoFlex>
            <ProfileImageLogo
              profileImage={shopImage}
              size="10rem"
              onClick={navigateShop}
            />
            <ProductShopPreviewContainer>
              <div>
                <h5>{name}</h5>
              </div>
              <div>
                <ProductShopDescription>{description}</ProductShopDescription>
              </div>
            </ProductShopPreviewContainer>
          </ProductShopInfoFlex>
        </div>
        <ProductShopStatsFlexWrapper>
          <ProductShopStats>
            <ProductShopStatsItemContainer>
              <ProductShopStatsItem>
                <Tag>Average Ratings </Tag>
                <h6>{ratingsAverage}</h6>
              </ProductShopStatsItem>
            </ProductShopStatsItemContainer>
            <ProductShopStatsItemContainer>
              <ProductShopStatsItem>
                <Tag>Ratings</Tag> <h6>{ratingsQuantity}</h6>
              </ProductShopStatsItem>
            </ProductShopStatsItemContainer>
            <ProductShopStatsItemContainer>
              <ProductShopStatsItem>
                <Tag> Products</Tag> <h6>{productsQuantity}</h6>
              </ProductShopStatsItem>
            </ProductShopStatsItemContainer>
            <ProductShopStatsItemContainer>
              <ProductShopStatsItem>
                <Tag> Products Sold</Tag> <h6>{totalUnitsSold}</h6>
              </ProductShopStatsItem>
            </ProductShopStatsItemContainer>
          </ProductShopStats>
        </ProductShopStatsFlexWrapper>
      </ContentFlexWrapper>
    </Card>
  );
};

export default ProductShop;