import React, { useState, useMemo } from 'react';
import { useGetOverallStatsQuery } from '../../redux/services/stats/overallStatsApi';
import styled, { useTheme } from 'styled-components';
import { Card, Select } from '../../components/common';
import moment from 'moment/moment';
import SalesAndUnitsPerMonthLineGraph from './salesAndUnitsPerMonthLineGraph';
import SalesAndUnitsPerDayGraph from './salesAndUnitsPerDayGraph';
import SalesByCategoryGraph from './salesByCategoryGraph';

const StyledCard = styled(Card)`
  height: 60rem;
`;

const YearSelectContainer = styled.div`
  position: absolute;
  display: flex;
  right: 0;
`;

const YearSelect = styled(Select)`
  width: 10rem;
  z-index: 50;
  top: 1rem;
  left: 1rem;
`;

const OverallStatsGrid = styled.main`
  column-gap: 1.6rem;
  row-gap: 1.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

export const AdminDashboard = () => {
  const theme = useTheme();

  const [queryStatsYear, setQueryStatsYear] = useState(
    new Date().getFullYear()
  );

  const { data: overallStats, isLoading } = useGetOverallStatsQuery(
    queryStatsYear,
    {
      pollingInterval: 10 * 60 * 60 * 1000,
    }
  );

  if (!overallStats || isLoading) return <h1>Loading...</h1>;

  const {
    monthlyData,
    dailyData,
    salesByCategory,
    createdAt,
    totalCustomers,
    year,
    yearlySalesTotal,
    yearlyTotalSoldunits,
  } = overallStats;

  const onChangeHandler = (e) => {
    setQueryStatsYear(e.target.value);
  };

  const yearsSinceCreation = moment().year() - moment(createdAt).format('YYYY');

  let i = 0;

  const yearsSelection = [];

  while (i <= yearsSinceCreation) {
    yearsSelection.push(moment(createdAt).add(i, 'days').format('YYYY'));
    i++;
  }

  return (
    <>
      <YearSelectContainer>
        <YearSelect onChange={onChangeHandler} value={queryStatsYear}>
          {yearsSelection.map((year) => (
            <option value={year}>{year}</option>
          ))}
        </YearSelect>
      </YearSelectContainer>
      <OverallStatsGrid>
        <SalesAndUnitsPerMonthLineGraph monthlyData={monthlyData} />
        <SalesAndUnitsPerDayGraph dailyData={dailyData} year={queryStatsYear} />
        <SalesByCategoryGraph salesByCategoryData={salesByCategory} />
        <StyledCard>
          <h4>Total Customers: {totalCustomers}</h4>
          <h4>Total Sales for 2023: {yearlySalesTotal}</h4>
          <h4>Total Units Sold for 2023:{yearlyTotalSoldunits}</h4>
        </StyledCard>
      </OverallStatsGrid>
    </>
  );
};
