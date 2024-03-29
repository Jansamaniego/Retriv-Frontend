import React, { ChangeEvent, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import moment from 'moment';
import { Serie } from '@nivo/line';

import { Card, Select } from 'components/common';
import LineGraph from 'pages/adminDashboard/salesAndUnitsPerMonthLineGraph/lineGraph';

interface ISalesAndUnitsPerMonthLineGraphProps {
  monthlyData: {
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
}

const StyledCard = styled(Card)`
  height: 60rem;
`;

const ViewSelectContainer = styled.div`
  display: flex;
`;

const ViewSelect = styled(Select)`
  width: 10rem;
  z-index: 50;
  top: 1rem;
  left: 1rem;
`;

const SalesAndUnitsPerMonthLineGraph: React.FC<
  ISalesAndUnitsPerMonthLineGraphProps
> = ({ monthlyData }) => {
  const theme = useTheme();
  const [view, setView] = useState('sales');
  const [salesPerMonthLine, unitsPerMonthLine] = useMemo(() => {
    if (!monthlyData) return [];

    let index = 0;

    let formattedMonthlyData = [];

    for (let i = 0; i < 12; i++) {
      const month = moment().day(1).month(i).format('MMMM');
      if (monthlyData[index] && month === monthlyData[index].month) {
        formattedMonthlyData.push({
          ...monthlyData[index],
        });
        index++;
      } else {
        formattedMonthlyData.push({
          month,
          totalSales: 0,
          totalUnits: 0,
        });
      }
    }

    const salesPerMonthLine: Serie | Serie[] = {
      id: 'salesPerMonth',
      color: theme.primary.main,
      data: [],
    };

    const unitsPerMonthLine: Serie | Serie[] = {
      id: 'unitsPerMonth',
      color: theme.secondary.main,
      data: [],
    };

    formattedMonthlyData.forEach(({ month, totalSales, totalUnits }) => {
      salesPerMonthLine.data = [
        ...salesPerMonthLine.data,
        { x: month, y: totalSales },
      ];
      unitsPerMonthLine.data = [
        ...unitsPerMonthLine.data,
        { x: month, y: totalUnits },
      ];
    });

    return [[salesPerMonthLine], [unitsPerMonthLine]];
  }, [monthlyData, theme.primary.main, theme.secondary.main]);

  const onChangeHandler = (event: ChangeEvent) => {
    setView((event.target as HTMLInputElement).value);
  };

  return (
    <StyledCard>
      <ViewSelectContainer>
        <ViewSelect onChange={onChangeHandler}>
          <option value="sales">Sales</option>
          <option value="units">Units</option>
        </ViewSelect>
      </ViewSelectContainer>
      <LineGraph
        data={
          view === 'sales' ? salesPerMonthLine || [] : unitsPerMonthLine || []
        }
        leftAxisLegend={view === 'sales' ? 'sales' : 'units'}
        bottomAxisLegend="month"
      />
    </StyledCard>
  );
};

export default SalesAndUnitsPerMonthLineGraph;
