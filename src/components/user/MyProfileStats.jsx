import React from 'react';
import styled from 'styled-components';
import { Button } from '../common';
import ProductsQuantitySoldChart from './ProductsQuantitySoldChart';
import RatingsQuantityPerRatingScoreChart from './RatingsQuantityPerRatingScoreChart';

const StyledUserInfoContainer = styled.main`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  column-gap: 2rem;
  row-gap: 3rem;
`;

const BarChartContainer = styled.div``;

const LineChartContainer = styled.div`
  grid-column: 1 / span 2;
`;

const PerformanceInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;


const MyProfileStats = ({ user }) => {
  const {
    avgShopRating,
    totalProductsSold,
    role,
    ratingsQuantityPerRatingScore,
    productsQuantitySoldPerMonth,
  } = user;
  return (
    <StyledUserInfoContainer>
      {role ? (
        <>
          <BarChartContainer>
            <RatingsQuantityPerRatingScoreChart
              chartData={ratingsQuantityPerRatingScore}
            />
          </BarChartContainer>
          <PerformanceInfo>
            {avgShopRating ? (
              <h4>Average Shop Rating: {avgShopRating}</h4>
            ) : null}
            {totalProductsSold ? (
              <h4>Total Products Sold: {totalProductsSold}</h4>
            ) : null}
          </PerformanceInfo>
          <LineChartContainer>
            <ProductsQuantitySoldChart
              chartData={productsQuantitySoldPerMonth}
            />
          </LineChartContainer>
        </>
      ) : null}
    </StyledUserInfoContainer>
  );
};

export default MyProfileStats;
