import React, { useState, ChangeEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import moment from 'moment/moment';

import { useGetOverallStatsQuery } from 'redux/services/stats/overallStatsApi/overallStatsApi';
import { Card, Loading, Select } from 'components/common';
import SalesAndUnitsPerMonthLineGraph from 'pages/adminDashboard/salesAndUnitsPerMonthLineGraph';
import SalesAndUnitsPerDayGraph from 'pages/adminDashboard/salesAndUnitsPerDayGraph';
import SalesByCategoryGraph from 'pages/adminDashboard/salesByCategoryGraph';

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
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr; */
  display: flex;
  flex-direction: column;
`;

export const AdminDashboard = () => {
  const [queryStatsYear, setQueryStatsYear] = useState<number>(
    new Date().getFullYear()
  );

  const { data: overallStats, isLoading } = useGetOverallStatsQuery(
    queryStatsYear,
    {
      pollingInterval: 10 * 60 * 60 * 1000,
    }
  );

  if (!overallStats || isLoading) return <Loading />;

  const {
    monthlyData,
    dailyData,
    salesByCategory,
    createdAt,
    totalCustomers,
    yearlySalesTotal,
    yearlyTotalSoldUnits,
  } = overallStats;

  const onChangeHandler = (event: ChangeEvent) => {
    setQueryStatsYear(Number((event.target as HTMLInputElement).value));
  };

  const yearsSinceCreation = moment().year() - moment(createdAt).year();

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
        <Card>
          <h4>Total Customers: {totalCustomers}</h4>
          <h4>Total Sales for 2023: {yearlySalesTotal}</h4>
          <h4>Total Units Sold for 2023:{yearlyTotalSoldUnits}</h4>
        </Card>
        <SalesAndUnitsPerMonthLineGraph monthlyData={monthlyData} />
        <SalesAndUnitsPerDayGraph dailyData={dailyData} year={queryStatsYear} />
        <SalesByCategoryGraph salesByCategoryData={salesByCategory} />
      </OverallStatsGrid>
    </>
  );
};
